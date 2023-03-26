
/***************************************************************    
CREATED BY : MD. TARIQUE

CREATED DATE : 12 FEB 2020

PURPOSE : TO SAVE DATA AND GENERATE AND TOKEN NUMBER

EXEC [dbo].[USP_SaveAndGenerateTokenForWeb]
1,1,'test','0','60'  
****************************************************************/    
CREATE PROCEDURE [dbo].[USP_SaveAndGenerateTokenForWeb]    
(    
	@iVehicleId BIGINT,  
	@iUserId BIGINT,   
	@cRegNo VARCHAR(100),    
	@iMinutes INT
)    
AS    
BEGIN TRY

	DECLARE @DB_NAME VARCHAR(20)       
	SELECT @DB_NAME=DB_NAME() ;     
	IF(ISNULL(@cRegNo,'')!='' AND ISNULL(@iMinutes,0)!=0 AND @iVehicleId!=0 )    
	BEGIN    
		INSERT INTO [dbo].[Trans_ShareOnMobile]    
		(    
			Fk_VehicleId,    
			RegistrationNo,    
			FromDate,    
			ToDate    
		)    
		VALUES    
		(   
			@iVehicleId,    
			@cRegNo,    
			CONVERT(DATETIME,GETDATE(),103),    
			CONVERT(DATETIME,DATEADD(MINUTE,@iMinutes,GETDATE()),103)    
		)    
	
		DECLARE @PK_ID INT    
		SET @PK_ID=SCOPE_IDENTITY()    
		UPDATE [dbo].[Trans_ShareOnMobile]    
		SET TokenNo=CONVERT(VARCHAR,CONVERT(NUMERIC(12,0),RAND() * 10000000000))    
		WHERE PK_ShareId=@PK_ID    
	
		UPDATE [dbo].[Trans_ShareOnMobile]    
		SET URL=
		CASE 
			WHEN @DB_NAME= 'Gyanmitras_Live' THEN 'http://Gyanmitras.vseen.my/ShareOnMobile/Index?TokenNo=' +TokenNo    
			WHEN @DB_NAME= 'Gyanmitras_Dev' THEN 'http://182.76.79.236:10003/ShareOnMobile/Index?TokenNo='+TokenNo			
			ELSE 'http://182.76.79.236:10001/ShareOnMobile/Index?TokenNo='+TokenNo  END      
		WHERE PK_ShareId=@PK_ID    
	
	
		SELECT 1 AS Message_Id,'Added Successfully' AS Message,1 as status    
		 
		SELECT TokenNo,    
		CASE 
		WHEN @DB_NAME= 'Gyanmitras_Live' THEN 'http://Gyanmitras.vseen.my/ShareOnMobile/Index?TokenNo='    
		WHEN @DB_NAME= 'Gyanmitras_Dev' THEN 'http://182.76.79.236:10003/ShareOnMobile/Index?TokenNo='     
		ELSE 'http://182.76.79.236:10001/ShareOnMobile/Index?TokenNo=' END 
		
		
		
		--'http://localhost:64930/ShareOnMobile/Index?TokenNo=' -- FOR TESTING : OPEN THIS AND COMMENT ABOVE VALUE
		AS [URL]     
		FROM [dbo].[Trans_ShareOnMobile] WHERE PK_ShareId=@PK_ID    
	
	END    
	ELSE    
	BEGIN    
		SELECT 0 AS Message_Id,'Details Cannot Be Empty' AS Message    
	END    
      
END TRY    
BEGIN CATCH    
 SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message    
END CATCH



