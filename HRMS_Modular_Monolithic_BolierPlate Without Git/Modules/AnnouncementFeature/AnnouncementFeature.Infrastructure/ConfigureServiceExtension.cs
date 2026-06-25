using AnnouncementFeature.Infrastructure.Configurations; // <-- Added this!
using HRMS.Core.Postgres.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AnnouncementFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddAnnouncementDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IPostgresEntityConfigurator, AnnouncementConfiguration>();
            return services;
        }
    }
}