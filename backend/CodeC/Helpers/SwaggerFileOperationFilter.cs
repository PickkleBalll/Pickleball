//using Microsoft.OpenApi.Models;
//using Swashbuckle.AspNetCore.SwaggerGen;
//using Microsoft.AspNetCore.Http;
//using System.Collections.Generic;
//using System.Linq;

//namespace MyApp.Helpers
//{
//    public class SwaggerFileOperationFilter : IOperationFilter
//    {
//        public void Apply(OpenApiOperation operation, OperationFilterContext context)
//        {
//            // Nếu method có tham số là IFormFile thì cấu hình lại request body để Swagger hiểu là multipart/form-data
//            var hasFormFile = context.MethodInfo
//                .GetParameters()
//                .Any(p => p.ParameterType == typeof(IFormFile));

//            if (hasFormFile)
//            {
//                operation.RequestBody = new OpenApiRequestBody
//                {
//                    Content = {
//                        ["multipart/form-data"] = new OpenApiMediaType
//                        {
//                            Schema = new OpenApiSchema
//                            {
//                                Type = "object",
//                                Properties = {
//                                    ["video"] = new OpenApiSchema
//                                    {
//                                        Type = "string",
//                                        Format = "binary"
//                                    }
//                                },
//                                Required = new HashSet<string> { "video" }
//                            }
//                        }
//                    }
//                };
//            }
//        }
//    }
//}
