using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApp.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToLearnerAndCoach : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Learners",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "CoachProfiles",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Learners_UserId",
                table: "Learners",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CoachProfiles_UserId",
                table: "CoachProfiles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CoachProfiles_Admins_UserId",
                table: "CoachProfiles",
                column: "UserId",
                principalTable: "Admins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Learners_Admins_UserId",
                table: "Learners",
                column: "UserId",
                principalTable: "Admins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoachProfiles_Admins_UserId",
                table: "CoachProfiles");

            migrationBuilder.DropForeignKey(
                name: "FK_Learners_Admins_UserId",
                table: "Learners");

            migrationBuilder.DropIndex(
                name: "IX_Learners_UserId",
                table: "Learners");

            migrationBuilder.DropIndex(
                name: "IX_CoachProfiles_UserId",
                table: "CoachProfiles");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Learners");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "CoachProfiles");
        }
    }
}
