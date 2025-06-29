using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApp.Migrations
{
    /// <inheritdoc />
    public partial class FixCoachIdType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CourseName",
                table: "Bookings");

            migrationBuilder.AlterColumn<string>(
                name: "CourseId",
                table: "Bookings",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "CoachId",
                table: "Bookings",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_CoachId",
                table: "Bookings",
                column: "CoachId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_CourseId",
                table: "Bookings",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_CoachProfiles_CoachId",
                table: "Bookings",
                column: "CoachId",
                principalTable: "CoachProfiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_CoursePackages_CourseId",
                table: "Bookings",
                column: "CourseId",
                principalTable: "CoursePackages",
                principalColumn: "PackageId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_CoachProfiles_CoachId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_CoursePackages_CourseId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_CoachId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_CourseId",
                table: "Bookings");

            migrationBuilder.AlterColumn<string>(
                name: "CourseId",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<int>(
                name: "CoachId",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CourseName",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
