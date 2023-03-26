/*****************************************************************
Created By: Vinish
Created Date: 2019-12-17
Purpose: Get Error log
*******************************************************************/
CREATE PROCEDURE [dbo].[USP_Get_ServiceErrorLog]
(
	@FromDatetime datetime,
	@ToDatetime Datetime,
	@cErrorLogType varchar(50)
)
AS
BEGIN TRY
IF(@cErrorLogType='ApplicationErrorLog')
BEGIN
	SELECT 1 AS Message_Id,'Success!' AS Message
	SELECT ErrorLogId,Assembly_Name,Class_Name,ErrorMessage,ErrorTime,ErrorType,Method_Name,
	Remarks,Source from [dbo].[ErrorLog_App] where ErrorTime between @FromDatetime and @ToDatetime
END
ELSE
IF(@cErrorLogType='ServiceErrorLog')
BEGIN
	SELECT 1 AS Message_Id,'Success!' AS Message
	SELECT ErrorLogId,Assembly_Name,Class_Name,ErrorMessage,ErrorTime,'' as ErrorType,Method_Name,
	Remarks,Source 
	FROM [dbo].[ErrorLog_Service]
	WHERE ErrorTime between @FromDatetime and @ToDatetime
END
END TRY
BEGIN CATCH
	SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message
END CATCH





