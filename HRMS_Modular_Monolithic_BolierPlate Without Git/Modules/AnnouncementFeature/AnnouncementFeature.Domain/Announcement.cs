using HRMS.Core.Postgres.Common;
using System;

namespace AnnouncementFeature.Domain
{
    public class Announcement : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public DateTime PublishDate { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
    }
}