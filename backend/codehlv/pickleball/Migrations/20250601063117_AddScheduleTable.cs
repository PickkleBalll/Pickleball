using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pickleball.Migrations
{
    /// <inheritdoc />
    public partial class AddScheduleTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentProgress_Lessons_LessonId",
                table: "StudentProgress");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentProgress",
                table: "StudentProgress");

            migrationBuilder.RenameTable(
                name: "StudentProgress",
                newName: "StudentProgresses");

            migrationBuilder.RenameIndex(
                name: "IX_StudentProgress_LessonId",
                table: "StudentProgresses",
                newName: "IX_StudentProgresses_LessonId");

            migrationBuilder.AddColumn<int>(
                name: "CoachId",
                table: "Payments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "StudentProgresses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentProgresses",
                table: "StudentProgresses",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CoachId = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CourseName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Schedules_CoachProfiles_CoachId",
                        column: x => x.CoachId,
                        principalTable: "CoachProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_CoachId",
                table: "Schedules",
                column: "CoachId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentProgresses_Lessons_LessonId",
                table: "StudentProgresses",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentProgresses_Lessons_LessonId",
                table: "StudentProgresses");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentProgresses",
                table: "StudentProgresses");

            migrationBuilder.DropColumn(
                name: "CoachId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "StudentProgresses");

            migrationBuilder.RenameTable(
                name: "StudentProgresses",
                newName: "StudentProgress");

            migrationBuilder.RenameIndex(
                name: "IX_StudentProgresses_LessonId",
                table: "StudentProgress",
                newName: "IX_StudentProgress_LessonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentProgress",
                table: "StudentProgress",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentProgress_Lessons_LessonId",
                table: "StudentProgress",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
