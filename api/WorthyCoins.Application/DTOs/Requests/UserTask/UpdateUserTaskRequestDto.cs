using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using WorthyCoins.Domain.Enumerators;

namespace WorthyCoins.Application.DTOs.Requests.UserTask
{
    public class UpdateUserTaskRequestDto
    {
        public required int UserTaskId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public int? AssignedChildId { get; set; }
        public decimal? RewardAmount { get; set; }
        public string? Icon { get; set; }
        public string? Color { get; set; }
        public UserTaskStatusEnum? Status { get; set; }
    }
}
