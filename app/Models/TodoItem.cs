namespace app.Models;

/// <summary>In-memory todo item. No persistence — demo state only.</summary>
public class TodoItem
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public bool Completed { get; set; }
    public DateOnly? DueDate { get; set; }
}
