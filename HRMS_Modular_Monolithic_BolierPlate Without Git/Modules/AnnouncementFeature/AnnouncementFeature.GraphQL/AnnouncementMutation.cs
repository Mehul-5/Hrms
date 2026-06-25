using HotChocolate;
using HotChocolate.Types;
using AnnouncementFeature.Domain;
using System;
using System.Threading.Tasks;
using HRMS.Core.Postgres; // <-- ADD THIS (or whatever folder your DbContext is in)

namespace AnnouncementFeature.GraphQL;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class AnnouncementMutation
{
    public async Task<Announcement> CreateAnnouncementAsync(
        string title, 
        string content, 
        string author,
        [Service] HrmsDbContext dbContext) // <-- REPLACE 'dynamic' WITH YOUR ACTUAL CONTEXT NAME!
    {
        var announcement = new Announcement
        {
            Id = Guid.NewGuid().ToString(), // (Or text, depending on our previous fix)
            Title = title,
            Content = content,
            Author = author,
            PublishDate = DateTime.UtcNow,
            IsActive = true,
            CreatedOn = DateTime.UtcNow
        };

        dbContext.Announcements.Add(announcement);
        await dbContext.SaveChangesAsync();

        return announcement;
    }
}