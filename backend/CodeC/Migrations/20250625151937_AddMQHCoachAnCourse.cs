using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApp.Migrations
{
    /// <inheritdoc />
    public partial class AddMQHCoachAnCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CoachId",
                table: "CoursePackages",
                type: "nvarchar(450)",
                nullable: true,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_CoursePackages_CoachId",
                table: "CoursePackages",
                column: "CoachId");

            migrationBuilder.AddForeignKey(
                name: "FK_CoursePackages_CoachProfiles_CoachId",
                table: "CoursePackages",
                column: "CoachId",
                principalTable: "CoachProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoursePackages_CoachProfiles_CoachId",
                table: "CoursePackages");

            migrationBuilder.DropIndex(
                name: "IX_CoursePackages_CoachId",
                table: "CoursePackages");

            migrationBuilder.DropColumn(
                name: "CoachId",
                table: "CoursePackages");
        }
    }
}
