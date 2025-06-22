//using Microsoft.OpenApi.Models;
//using Swashbuckle.AspNetCore.SwaggerGen;
//using System.Linq;

//namespace MyApp.Helpers
//{
//    public class AddFileParamTypesOperationFilter : IOperationFilter
//    {
//        public void Apply(OpenApiOperation operation, OperationFilterContext context)
//        {
//            var fileParams = context.MethodInfo
//            .GetParameters()
//            .Where(p => p.ParameterType == typeof(Microsoft.AspNetCore.Http.IFormFile));

            
//                if (!fileParams.Any()) return;

//            operation.RequestBody = new OpenApiRequestBody
//            {
//                Content =
//            {
//                ["multipart/form-data"] = new OpenApiMediaType
//                {
//                    Schema = new OpenApiSchema
//                    {
//                        Type = "object",
//                        Properties = fileParams.ToDictionary(
//                            p => p.Name!,
//                            p => new OpenApiSchema { Type = "string", Format = "binary" }
//                        ),
//                        Required = fileParams.Select(p => p.Name!).ToHashSet()
//                    }
//                }
//            }
//            };
//        }
//    }
//}