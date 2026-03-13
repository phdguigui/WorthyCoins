using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace WorthyCoins.Infrastructure.Identity.Services
{
    public class TokenService
    {
        private const string PrivateKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        public string Generate()
        {
            var handler = new JwtSecurityTokenHandler();

            var keyBytes = Encoding.ASCII.GetBytes(PrivateKey);

            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(keyBytes), 
                SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                SigningCredentials = credentials,
                Expires = DateTime.UtcNow.AddDays(7),
                IssuedAt = DateTime.UtcNow,
            };
            
            var token = handler.CreateToken(tokenDescriptor);

            return handler.WriteToken(token);
        }
    }
}
