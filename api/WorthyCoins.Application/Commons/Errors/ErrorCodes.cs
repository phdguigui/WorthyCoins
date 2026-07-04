namespace WorthyCoins.Application.Commons.Errors
{
    public static class ErrorCodes
    {
        public const string PasswordMissingUpperCase = "PASSWORD_MISSING_UPPER_CASE";
        public const string InvalidCredentials = "INVALID_CREDENTIALS";
        public const string PasswordMissing = "PASSWORD_MISSING";
        public const string UserCreationFailed = "USER_CREATION_FAILED";
        public const string FirstNameMissing = "FIRST_NAME_MISSING";
        public const string LastNameMissing = "LAST_NAME_MISSING";
        public const string EmailMissing = "EMAIL_MISSING";
        public const string EmailInvalid = "EMAIL_INVALID";
        public const string ConfirmPasswordMissing = "CONFIRM_PASSWORD_MISSING";
        public const string PasswordsDoNotMatch = "PASSWORDS_DO_NOT_MATCH";
        public const string EmailAlreadyExists = "EMAIL_ALREADY_EXISTS";
    }
}