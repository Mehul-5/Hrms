using LeaveFeature.Infrastructure;
using TodoFeature.Infrastructure;
using AnnouncementFeature.Infrastructure; // <-- Added this!

namespace HRMS.API.RegisterDependencies
{
    public static class RepositoryRegistration
    {
        public static IServiceCollection AddModulesDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTodoDependency(configuration);
            services.AddLeaveDependency(configuration);
            services.AddAnnouncementDependency(configuration); // Now it knows what this is!
            return services;
        }
    }
}