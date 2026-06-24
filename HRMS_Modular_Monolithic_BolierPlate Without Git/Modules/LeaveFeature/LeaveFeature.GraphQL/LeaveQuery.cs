using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using HRMS.Core.Postgres.Data;
using LeaveFeature.Domain;
using System.Linq;

namespace LeaveFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class LeaveQuery
    {
        // Switched to the industry-standard Cursor Pagination!
        [UsePaging(MaxPageSize = 100, IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<LeaveBalance> GetLeaveBalances([Service] PostgresDbContext context)
        {
            // HotChocolate will translate this into an optimized SQL query
            return context.Set<LeaveBalance>();
        }
    }
}