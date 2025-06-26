using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApp.Migrations
{
    /// <inheritdoc />
    public partial class AddTableCreateCoachFeedback : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "LearnerId",
                table: "CoachFeedbacks",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "CoachId",
                table: "CoachFeedbacks",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "CourseId",
                table: "CoachFeedbacks",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_CoachFeedbacks_CoachId",
                table: "CoachFeedbacks",
                column: "CoachId");

            migrationBuilder.CreateIndex(
                name: "IX_CoachFeedbacks_CourseId",
                table: "CoachFeedbacks",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CoachFeedbacks_LearnerId",
                table: "CoachFeedbacks",
                column: "LearnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_CoachFeedbacks_CoachProfiles_CoachId",
                table: "CoachFeedbacks",
                column: "CoachId",
                principalTable: "CoachProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CoachFeedbacks_CoursePackages_CourseId",
                table: "CoachFeedbacks",
                column: "CourseId",
                principalTable: "CoursePackages",
                principalColumn: "PackageId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CoachFeedbacks_Learners_LearnerId",
                table: "CoachFeedbacks",
                column: "LearnerId",
                principalTable: "Learners",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoachFeedbacks_CoachProfiles_CoachId",
                table: "CoachFeedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_CoachFeedbacks_CoursePackages_CourseId",
                table: "CoachFeedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_CoachFeedbacks_Learners_LearnerId",
                table: "CoachFeedbacks");

            migrationBuilder.DropIndex(
                name: "IX_CoachFeedbacks_CoachId",
                table: "CoachFeedbacks");

            migrationBuilder.DropIndex(
                name: "IX_CoachFeedbacks_CourseId",
                table: "CoachFeedbacks");

            migrationBuilder.DropIndex(
                name: "IX_CoachFeedbacks_LearnerId",
                table: "CoachFeedbacks");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "CoachFeedbacks");

            migrationBuilder.AlterColumn<string>(
                name: "LearnerId",
                table: "CoachFeedbacks",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "CoachId",
                table: "CoachFeedbacks",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
