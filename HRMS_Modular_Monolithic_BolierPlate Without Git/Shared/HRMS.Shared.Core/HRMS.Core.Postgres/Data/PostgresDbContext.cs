using HRMS.Core.Postgres.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Core.Postgres.Data
{
    public class PostgresDbContext : DbContext
    {
        private readonly IEnumerable<IPostgresEntityConfigurator> _configurators;

        public PostgresDbContext(
            DbContextOptions<PostgresDbContext> options,
            IEnumerable<IPostgresEntityConfigurator> configurators) : base(options)
        {
            _configurators = configurators;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Dynamically scan all HRMS and Feature assemblies for database configurations
            // This guarantees true Modular Monolith isolation without hardcoding.
            var assemblies = AppDomain.CurrentDomain.GetAssemblies()
                .Where(a => a.FullName != null && (a.FullName.StartsWith("HRMS") || a.FullName.Contains("Feature")));

            var configurators = assemblies
                .SelectMany(a => a.GetTypes())
                .Where(t => typeof(IPostgresEntityConfigurator).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
                .Select(Activator.CreateInstance)
                .Cast<IPostgresEntityConfigurator>();

            foreach (var configurator in configurators)
            {
                configurator.Configure(modelBuilder);
            }
        }
    }
}
