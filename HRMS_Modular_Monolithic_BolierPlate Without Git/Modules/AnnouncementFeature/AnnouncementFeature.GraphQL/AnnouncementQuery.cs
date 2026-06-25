using AnnouncementFeature.Domain;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using HRMS.Core.Postgres.Data;
using System.Linq;

namespace AnnouncementFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class AnnouncementQuery
    {
        [UsePaging(MaxPageSize = 100, IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Announcement> GetAnnouncements([Service] PostgresDbContext context)
        {
            return context.Set<Announcement>()
                          .Where(a => a.IsActive)
                          .OrderByDescending(a => a.PublishDate);
        }
    }
}