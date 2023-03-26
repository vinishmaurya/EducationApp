/*****************************************************************
Created By: Vinish
Created Date: 14 JAN 2020
Purpose: Log SERVICE Lever Error Details.
SELECT * FROM  [dbo].[ErrorLog_Service]
SELECT * FROM [dbo].[ErrorLog_App] 
*******************************************************************/
CREATE PROCEDURE [dbo].[usp_LogServiceError]
	(
		@cSource				varchar(100),
		@cAssemblyName			varchar(100),
		@cClassName				varchar(100),
		@cMethodName			varchar(100),
		@cErrorMessage			nvarchar(max),
		@cRemarks				nvarchar(max)
	)
AS
	BEGIN
		INSERT dbo.ErrorLog_Service (ErrorTime,Source,Assembly_Name,Class_Name,Method_Name,ErrorMessage,Remarks )
		VALUES ( GETDATE(),@cSource,@cAssemblyName,@cClassName,@cMethodName,@cErrorMessage,@cRemarks )
	END;



