export const Users = [
  // User 1
  {
    username: "Jane",
    password_hash:
      "$2a$10$GrHwlJUVQHnJO3WsOAl9buEwvLDifB.6ffbjag9oWaib8MELkJh7K", //plain text: testpassword
    email: "jane@mail.com",
    created_at: new Date("2024-01-01T10:00:00Z"),
    screen_name: "Test User ✨",
    timezone: "Europe/Berlin",
    share_timezone: true,
    dm_permission: "friends",
    person_description: "Hi, I'm Jane. I'm a test user.",
    profile_image: "1712753350248.png",
  },
  // User 2
  {
    username: "JohnDoe",
    password_hash:
      "$2a$10$l.kUHe/Nx1tdmuK.U4vGBOJC6VHxUiVpU2oYq1bCf4UZHY3SwVcse", //plain text: unknownpass
    email: "john@mail.com",
    created_at: new Date("2024-02-10T08:15:00Z"),
    screen_name: "JD",
    timezone: "US/Central",
    share_timezone: true,
    dm_permission: "friends",
    person_description: "Hello, I'm John. Nice to meet you!",
    profile_image: "1712753350248.png",
  },
  // User 3
  {
    username: "EmilySmith",
    password_hash:
      "$2a$10$qOYcYIyppIBS3frTznxAq.OF8ochd24eR30LTh6tYXDqqYZ/kwHMi", //plain text: thisisatest
    email: "emily@mail.com",
    created_at: new Date("2024-03-05T14:30:00Z"),
    screen_name: "Em",
    timezone: "Asia/Singapore",
    share_timezone: false,
    dm_permission: "anyone",
    person_description: "Hi there, I'm Emily!",
    profile_image: "1712753350248.png",
  },
  // User 4
  {
    username: "DavidBrown",
    password_hash:
      "$2a$10$AY59RIZfwCMGHZHBCmIVDuFBueGwaLu0XgaY7R/9RxdVnpts3131e", //plain text: bowieboy
    email: "david@mail.com",
    created_at: new Date("2024-04-20T12:45:00Z"),
    screen_name: "Dave",
    timezone: "Pacific/Honolulu",
    share_timezone: true,
    dm_permission: "friends",
    person_description: "Hey, I'm David. Nice to meet you all!",
    profile_image: "1712753350248.png",
  },
  // User 5
  {
    username: "SarahJohnson",
    password_hash:
      "$2a$10$bPD.6HJuDYQDLjaHWYNMJ.HvMhajR8ZuCqvunPqYQSQ0A.N/b4DNu", //plain text: mycoolpassword
    email: "sarah@mail.com",
    created_at: new Date("2024-05-15T17:20:00Z"),
    screen_name: "SJ",
    timezone: "US/Pacific",
    share_timezone: false,
    dm_permission: "friends",
    person_description: "Hi, I'm Sarah! Excited to be here.",
    profile_image: "1712753350248.png",
  },
  // User 6 (Dickerson)
  {
    username: "Dickerson",
    password_hash:
      "$2a$10$6SjMFIHu4J1JPX.bunzQ9eTymyPB4TrLF5m0e9zvNVHK4R6grXBu2", //plain text: teamyellow
    email: "dickerson@example.com",
    created_at: new Date("2024-06-30T09:30:00Z"),
    screen_name: "Dick",
    timezone: "Europe/Helsinki",
    share_timezone: true,
    dm_permission: "servers",
    person_description: "I'm Dick, but you can call me Big Dick 😄",
    profile_image: "1712753350248.png",
  },
  // User 7
  {
    username: "GrimReaper",
    password_hash:
      "$2a$10$..Jhw9WkvCqF4rtRMdMPmuJAEvn7Jf8OTZcF6Lr0dP/86isk0HykS", //plain text: rigormortis
    email: "grim@example.com",
    created_at: new Date("2025-03-15T12:00:00Z"),
    screen_name: "Grim Reaper 💀",
    timezone: "America/Chicago",
    share_timezone: true,
    dm_permission: "servers",
    person_description:
      "Hello mortals, I'm Grim Reaper. Don't mind me, just here to collect some souls! 💀 Remember, life is short, but mine's eternal!",
    profile_image: "1712753350248.png",
  },
];
