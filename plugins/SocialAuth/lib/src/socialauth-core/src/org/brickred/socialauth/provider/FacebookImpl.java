/*
 ===========================================================================
 Copyright (c) 2010 BrickRed Technologies Limited

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sub-license, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ===========================================================================

 */

package org.brickred.socialauth.provider;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.brickred.socialauth.AbstractProvider;
import org.brickred.socialauth.AuthProvider;
import org.brickred.socialauth.Contact;
import org.brickred.socialauth.Permission;
import org.brickred.socialauth.Profile;
import org.brickred.socialauth.exception.ServerDataException;
import org.brickred.socialauth.exception.SocialAuthException;
import org.brickred.socialauth.exception.UserDeniedPermissionException;
import org.brickred.socialauth.oauthstrategy.OAuth2;
import org.brickred.socialauth.oauthstrategy.OAuthStrategyBase;
import org.brickred.socialauth.util.AccessGrant;
import org.brickred.socialauth.util.BirthDate;
import org.brickred.socialauth.util.Constants;
import org.brickred.socialauth.util.MethodType;
import org.brickred.socialauth.util.OAuthConfig;
import org.brickred.socialauth.util.Response;
import org.brickred.socialauth.util.SocialAuthUtil;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Provider implementation for Facebook
 * 
 * @author Abhinav Maheshwari
 * 
 */
public class FacebookImpl extends AbstractProvider implements AuthProvider,
		Serializable {

	private static final long serialVersionUID = 8644510564735754296L;
	private static final String PROFILE_URL = "https://graph.facebook.com/me";
	private static final String CONTACTS_URL = "https://graph.facebook.com/me/friends";
	private static final String UPDATE_STATUS_URL = "https://graph.facebook.com/me/feed";
	private static final String PROFILE_IMAGE_URL = "http://graph.facebook.com/%1$s/picture";
	private static final String PUBLIC_PROFILE_URL = "http://www.facebook.com/profile.php?id=";
	private static final Map<String, String> ENDPOINTS;
	private final Log LOG = LogFactory.getLog(FacebookImpl.class);

	private Permission scope;
	private OAuthConfig config;
	private Profile userProfile;
	private AccessGrant accessGrant;
	private OAuthStrategyBase authenticationStrategy;

	// set this to the list of extended permissions you want
	private static final String[] AllPerms = new String[] { "publish_stream",
			"email", "user_birthday", "user_location" };
	private static final String[] AuthPerms = new String[] { "email",
			"user_birthday", "user_location" };

	static {
		ENDPOINTS = new HashMap<String, String>();
		ENDPOINTS.put(Constants.OAUTH_AUTHORIZATION_URL,
				"https://graph.facebook.com/oauth/authorize");
		ENDPOINTS.put(Constants.OAUTH_ACCESS_TOKEN_URL,
				"https://graph.facebook.com/oauth/access_token");
	}

	/**
	 * Stores configuration for the provider
	 * 
	 * @param providerConfig
	 *            It contains the configuration of application like consumer key
	 *            and consumer secret
	 * @throws Exception
	 */
	public FacebookImpl(final OAuthConfig providerConfig) throws Exception {
		config = providerConfig;
		if (config.getCustomPermissions() != null) {
			scope = Permission.CUSTOM;
		}
		authenticationStrategy = new OAuth2(config, ENDPOINTS);
		authenticationStrategy.setPermission(scope);
		authenticationStrategy.setScope(getScope());
	}

	/**
	 * Stores access grant for the provider
	 * 
	 * @param accessGrant
	 *            It contains the access token and other information
	 * @throws Exception
	 */
	@Override
	public void setAccessGrant(final AccessGrant accessGrant) throws Exception {
		this.accessGrant = accessGrant;
		authenticationStrategy.setAccessGrant(accessGrant);
	}

	/**
	 * This is the most important action. It redirects the browser to an
	 * appropriate URL which will be used for authentication with the provider
	 * that has been set using setId()
	 * 
	 */
	@Override
	public String getLoginRedirectURL(final String successUrl) throws Exception {
		return authenticationStrategy.getLoginRedirectURL(successUrl);
	}

	/**
	 * Verifies the user when the external provider redirects back to our
	 * application.
	 * 
	 * @return Profile object containing the profile information
	 * @param httpReq
	 *            Request object the request is received from the provider
	 * @throws Exception
	 */

	@Override
	public Profile verifyResponse(final HttpServletRequest httpReq)
			throws Exception {
		Map<String, String> params = SocialAuthUtil
				.getRequestParametersMap(httpReq);
		return doVerifyResponse(params);
	}

	/**
	 * Verifies the user when the external provider redirects back to our
	 * application.
	 * 
	 * 
	 * @param requestParams
	 *            request parameters, received from the provider
	 * @return Profile object containing the profile information
	 * @throws Exception
	 */

	@Override
	public Profile verifyResponse(final Map<String, String> requestParams)
			throws Exception {
		return doVerifyResponse(requestParams);
	}

	private Profile doVerifyResponse(final Map<String, String> requestParams)
			throws Exception {
		LOG.info("Retrieving Access Token in verify response function");
		if (requestParams.get("error_reason") != null
				&& "user_denied".equals(requestParams.get("error_reason"))) {
			throw new UserDeniedPermissionException();
		}
		accessGrant = authenticationStrategy.verifyResponse(requestParams);

		if (accessGrant != null) {
			LOG.debug("Obtaining user profile");
			return authFacebookLogin();
		} else {
			throw new SocialAuthException("Access token not found");
		}
	}

	private Profile authFacebookLogin() throws Exception {
		String presp;

		try {
			Response response = authenticationStrategy.executeFeed(PROFILE_URL);
			presp = response.getResponseBodyAsString(Constants.ENCODING);
		} catch (Exception e) {
			throw new SocialAuthException("Error while getting profile from "
					+ PROFILE_URL, e);
		}
		try {
			LOG.debug("User Profile : " + presp);
			JSONObject resp = new JSONObject(presp);
			Profile p = new Profile();
			p.setValidatedId(resp.getString("id"));
			p.setFirstName(resp.getString("first_name"));
			p.setLastName(resp.getString("last_name"));
			p.setEmail(resp.getString("email"));
			if (resp.has("location")) {
				p.setLocation(resp.getJSONObject("location").getString("name"));
			}
			if (resp.has("birthday")) {
				String bstr = resp.getString("birthday");
				String[] arr = bstr.split("/");
				BirthDate bd = new BirthDate();
				if (arr.length > 0) {
					bd.setMonth(Integer.parseInt(arr[0]));
				}
				if (arr.length > 1) {
					bd.setDay(Integer.parseInt(arr[1]));
				}
				if (arr.length > 2) {
					bd.setYear(Integer.parseInt(arr[2]));
				}
				p.setDob(bd);
			}
			if (resp.has("gender")) {
				p.setGender(resp.getString("gender"));
			}
			p.setProfileImageURL(String.format(PROFILE_IMAGE_URL,
					resp.getString("id")));
			String locale = resp.getString("locale");
			if (locale != null) {
				String a[] = locale.split("_");
				p.setLanguage(a[0]);
				p.setCountry(a[1]);
			}
			p.setProviderId(getProviderId());
			userProfile = p;
			return p;

		} catch (Exception ex) {
			throw new ServerDataException(
					"Failed to parse the user profile json : " + presp, ex);
		}
	}

	/**
	 * Updates the status on the chosen provider if available. This may not be
	 * implemented for all providers.
	 * 
	 * @param msg
	 *            Message to be shown as user's status
	 * @throws Exception
	 */

	@Override
	public void updateStatus(final String msg) throws Exception {
		LOG.info("Updating status : " + msg);
		if (msg == null || msg.trim().length() == 0) {
			throw new ServerDataException("Status cannot be blank");
		}
		StringBuilder strb = new StringBuilder();
		strb.append("message=").append(msg);
		strb.append("&access_token").append("=").append(accessGrant.getKey());
		Response serviceResponse;
		try {
			serviceResponse = authenticationStrategy.executeFeed(
					UPDATE_STATUS_URL, MethodType.POST.toString(), null, null,
					strb.toString());
			if (serviceResponse.getStatus() != 200) {
				throw new SocialAuthException(
						"Status not updated. Return Status code :"
								+ serviceResponse.getStatus());
			}
		} catch (Exception e) {
			throw new SocialAuthException(e);
		}

	}

	/**
	 * Gets the list of contacts of the user. this may not be available for all
	 * providers.
	 * 
	 * @return List of contact objects representing Contacts. Only name will be
	 *         available
	 */

	@Override
	public List<Contact> getContactList() throws Exception {
		List<Contact> plist = new ArrayList<Contact>();
		LOG.info("Fetching contacts from " + CONTACTS_URL);
		String respStr;
		try {
			Response response = authenticationStrategy
					.executeFeed(CONTACTS_URL);
			respStr = response.getResponseBodyAsString(Constants.ENCODING);
		} catch (Exception e) {
			throw new SocialAuthException("Error while getting contacts from "
					+ CONTACTS_URL, e);
		}
		try {
			LOG.debug("User Contacts list in json : " + respStr);
			JSONObject resp = new JSONObject(respStr);
			JSONArray data = resp.getJSONArray("data");
			LOG.debug("Found contacts : " + data.length());
			for (int i = 0; i < data.length(); i++) {
				JSONObject obj = data.getJSONObject(i);
				Contact p = new Contact();
				String name = obj.getString("name");
				if (name != null) {
					String nameArr[] = name.split(" ");
					if (nameArr.length > 1) {
						p.setFirstName(nameArr[0]);
						p.setLastName(nameArr[1]);
					} else {
						p.setFirstName(obj.getString("name"));
					}
					p.setDisplayName(name);
				}
				p.setId(obj.getString("id"));
				p.setProfileUrl(PUBLIC_PROFILE_URL + obj.getString("id"));
				plist.add(p);
			}
		} catch (Exception e) {
			throw new ServerDataException(
					"Failed to parse the user profile json : " + respStr, e);
		}
		return plist;
	}

	/**
	 * Logout
	 */
	@Override
	public void logout() {
		accessGrant = null;
		authenticationStrategy.logout();
	}

	/**
	 * 
	 * @param p
	 *            Permission object which can be Permission.AUHTHENTICATE_ONLY,
	 *            Permission.ALL, Permission.DEFAULT
	 */
	@Override
	public void setPermission(final Permission p) {
		LOG.debug("Permission requested : " + p.toString());
		this.scope = p;
		authenticationStrategy.setPermission(this.scope);
		authenticationStrategy.setScope(getScope());
	}

	/**
	 * Makes HTTP request to a given URL.It attaches access token in URL.
	 * 
	 * @param url
	 *            URL to make HTTP request.
	 * @param methodType
	 *            Method type can be GET, POST or PUT
	 * @param params
	 *            Not using this parameter in Google API function
	 * @param headerParams
	 *            Parameters need to pass as Header Parameters
	 * @param body
	 *            Request Body
	 * @return Response object
	 * @throws Exception
	 */
	@Override
	public Response api(final String url, final String methodType,
			final Map<String, String> params,
			final Map<String, String> headerParams, final String body)
			throws Exception {
		LOG.info("Calling api function for url	:	" + url);
		Response response = null;
		try {
			response = authenticationStrategy.executeFeed(url, methodType,
					params, headerParams, body);
		} catch (Exception e) {
			throw new SocialAuthException(
					"Error while making request to URL : " + url, e);
		}
		return response;
	}

	/**
	 * Retrieves the user profile.
	 * 
	 * @return Profile object containing the profile information.
	 */
	@Override
	public Profile getUserProfile() throws Exception {
		if (userProfile == null && accessGrant != null) {
			authFacebookLogin();
		}
		return userProfile;
	}

	@Override
	public AccessGrant getAccessGrant() {
		return accessGrant;
	}

	@Override
	public String getProviderId() {
		return config.getId();
	}

	private String getScope() {
		StringBuffer result = new StringBuffer();
		String arr[] = null;
		if (Permission.AUTHENTICATE_ONLY.equals(scope)) {
			arr = AuthPerms;
		} else if (Permission.CUSTOM.equals(scope)
				&& config.getCustomPermissions() != null) {
			arr = config.getCustomPermissions().split(",");
		} else {
			arr = AllPerms;
		}
		result.append(arr[0]);
		for (int i = 1; i < arr.length; i++) {
			result.append(",").append(arr[i]);
		}
		return result.toString();
	}
}