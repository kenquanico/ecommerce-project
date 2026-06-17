
using System;
using System.IO;

enum Level
{
    Freshman = 1,
    Sophomore,
    Junior,
    Senior
}

struct Student
{
    public string name;
    public int age;
    public Level yearLevel;
}

class Program
{
    static void Main()
    {
        Student s = new Student();

        Console.Write("Enter student name: ");
        s.name = Console.ReadLine();

        Console.Write("Enter student age: ");
        try
        {
            s.age = int.Parse(Console.ReadLine());
        }
        catch
        {
            Console.WriteLine("Invalid age input. Setting age to 0.");
            s.age = 0;
        }

        Console.WriteLine("Choose year level: 1-Freshman, 2-Sophomore, 3-Junior, 4-Senior");
        int choice = 0;
        try
        {
            choice = int.Parse(Console.ReadLine());
        }
        catch
        {
            Console.WriteLine("Invalid input. Setting year level to Freshman.");
            choice = 1;
        }

        if (choice < 1 || choice > 4) choice = 1;
        s.yearLevel = (Level)choice;

        string content = $"Name: {s.name}\nAge: {s.age}\nYear Level: {s.yearLevel}";
        File.WriteAllText("student.txt", content);

        Console.WriteLine("Student info saved to student.txt");
    }
}
