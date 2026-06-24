using HotChocolate.Execution.Configuration;
using TodoFeature.GraphQL;
using LeaveFeature.GraphQL;

namespace HRMS.API.RegisterDependencies
{
    public static class GraphQLModuleRegistration
    {
        public static IRequestExecutorBuilder AddGraphQLModules(this IRequestExecutorBuilder builder)
        {
            return builder
                .AddTodosGraphQL()
                .AddTypeExtension<LeaveMutation>(); // <-- This is the crucial link
        }
    }
}