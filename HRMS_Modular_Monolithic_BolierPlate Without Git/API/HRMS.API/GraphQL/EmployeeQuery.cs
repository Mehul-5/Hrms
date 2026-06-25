using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using HRMS.Core.Postgres.Data;
using HRMS.Shared.Domain.Entity;
using System.Linq;

namespace HRMS.API.GraphQL
{
    [ExtendObjectType("Query")]
    public class EmployeeQuery
    {
        [UsePaging(MaxPageSize = 100, IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Employee> GetEmployees([Service] PostgresDbContext context)
        {
            // Instantly exposes the entire Employee matrix hierarchy to the frontend!
            return context.Set<Employee>();
        }
    }
}