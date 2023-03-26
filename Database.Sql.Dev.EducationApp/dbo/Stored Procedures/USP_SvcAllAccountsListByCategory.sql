/******************************************  
CreatedBy:Vinish
CreatedDate:2023-03-14 15:19:58.740
purpos:Get Account Details By Optional Conditions

EXEC [dbo].[USP_SvcAllAccountsListByCategory] 1,1
****************************************************/ 
CREATE PROC [dbo].[USP_SvcAllAccountsListByCategory]
(
	@iFK_CategoryId bigint = 0,
	@bIsParentAccount BIT = 0
)
AS
BEGIN TRY
	SELECT 1 AS Message_Id,'Success!' AS Message 
	SELECT PK_AccountId AccountId,ISNULL(AccountName,'') AccountName 
	FROM MST_ACCOUNT 
	WHERE FK_CategoryId  = IIF(@iFK_CategoryId <> 0,@iFK_CategoryId,FK_CategoryId) AND 
	ISNULL(IsActive,0) = 1 AND 
	ISNULL(IsDeleted,0) = 0 AND
	1 = 
	IIF
	(
		@bIsParentAccount = 1 AND 
		ISNULL(ParentAccountId,0) <> 0,
		1,
		IIF(@bIsParentAccount = 0,1,0)
	)
END TRY
BEGIN CATCH                 
	INSERT INTO ErrorLog 
	(
		 [ErrorNumber]
		,[ErrorSeverity]
		,[ErrorState]
		,[ErrorProcedure]
		,[ErrorLine]
		,[ErrorMessage]
		,[ErrorDatetime]
	)
	VALUES
	(
		ERROR_NUMBER(),
		ERROR_SEVERITY(),
		ERROR_STATE(),
		ERROR_PROCEDURE(),
		ERROR_LINE(),
		ERROR_MESSAGE(),
		GETDATE()
	)
	SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                 
END CATCH;
