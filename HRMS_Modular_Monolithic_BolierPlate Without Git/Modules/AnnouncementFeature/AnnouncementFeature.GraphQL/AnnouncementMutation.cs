using HotChocolate;
using HotChocolate.Types;
using AnnouncementFeature.Domain;
using System;
using System.Threading.Tasks;
using HRMS.Core.Postgres.Data; // <-- Connects to your database context

namespace AnnouncementFeature.GraphQL;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class AnnouncementMutation
{
    public async Task<Announcement> CreateAnnouncementAsync(
        string title, 
        string content, 
        string author,
        [Service] PostgresDbContext dbContext) 
    {
        var announcement = new Announcement
        {
            Id = Guid.NewGuid().ToString(), 
            Title = title,
            Content = content,
            Author = author,
            PublishDate = DateTime.UtcNow,
            IsActive = true,
            CreatedOn = DateTime.UtcNow
        };

        dbContext.Add(announcement);
        await dbContext.SaveChangesAsync();

        return announcement;
    }
}