using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApp.Migrations
{
    /// <inheritdoc />
    public partial class AddGuidDefaultsToPaymentAndFeedback : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "LessonId",
                table: "Feedbacks");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Feedbacks",
                newName: "FeedbackId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FeedbackId",
                table: "Feedbacks",
                newName: "Id");

            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "Feedbacks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LessonId",
                table: "Feedbacks",
                type: "int",
                nullable: true);
        }
    }
}
