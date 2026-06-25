using AnnouncementFeature.Domain;
using HRMS.Core.Postgres.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AnnouncementFeature.Infrastructure.Configurations
{
    public class AnnouncementConfiguration : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Announcement>().ToTable("announcements");
        }
    }
}