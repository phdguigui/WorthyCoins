using Application.DTOs.Responses.Child;

namespace Application.DTOs.Responses.Parent
{
    public class ParentResponseDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public virtual ICollection<ChildResponseDto>? Children { get; set; }
    }
}
