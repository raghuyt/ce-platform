
ALTER TABLE [credit_requests] ADD [firstname] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [middlename] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [lastname] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [degree] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [completedate] DATETIME;
ALTER TABLE [credit_requests] ADD [address1] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [address2] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [city] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [state] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [country] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [zipcode] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [phone1] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [phone1ext] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [phone2] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [phone2ext] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [fax] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [faxext] VARCHAR(255);
ALTER TABLE [credit_requests] ADD [hours] DECIMAL;
ALTER TABLE [credit_requests] ADD [notifyflag] INT DEFAULT 1 NOT NULL;
