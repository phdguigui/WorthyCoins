using WorthyCoins.Application.DTOs.Responses.Child;
using WorthyCoins.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorthyCoins.Application.DTOs.Responses.UserTask
{
    public class UserTaskResponseDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? DueDate { get; set; }
        public int AssignedChildId { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsCanceled { get; set; }
        public decimal RewardAmount { get; set; }
        public virtual ChildResponseDto? AssignedChild { get; set; }
    }
}
