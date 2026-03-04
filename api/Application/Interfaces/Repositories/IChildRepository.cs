using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface IChildRepository
    {
        public Task<Child> AddAsync(Child entity);
        public Task<Child> GetByIdAsync(int id);
        public Task<List<Child>> GetByParentIdAsync(int id);
        public Task<Child> UpdateAsync(Child entity);
        public Task<int> DeleteAsync(int id);
    }
}
