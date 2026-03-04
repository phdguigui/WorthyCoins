using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorthyCoins.Application.DTOs.Requests.Parent
{
    public class CreateParentRequestDto
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
    }
}
