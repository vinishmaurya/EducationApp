/*****************************************************************
Created By: Vinish
Created Date: 2020-01-06
Purpose: Log Application Lever Error Details.
SELECT * FROM  [dbo].[ErrorLog_App] 
*******************************************************************/
CREATE PROCEDURE [dbo].[usp_LogApplicationError]
(
	@cSource				VARCHAR(100),
	@cAssemblyName			VARCHAR(100),
	@cClassName				VARCHAR(100),
	@cMethodName			VARCHAR(100),
	@cErrorMessage			VARCHAR(300),
	@cErrorType 			VARCHAR(100),
	@cRemarks				VARCHAR(100)
)
AS
	BEGIN
		INSERT [dbo].[ErrorLog_App] (ErrorTime,Source,Assembly_Name,Class_Name,Method_Name,ErrorMessage,ErrorType,Remarks )
		VALUES ( GETDATE(),@cSource,@cAssemblyName,@cClassName,@cMethodName,@cErrorMessage,@cErrorType,@cRemarks )
	END;



