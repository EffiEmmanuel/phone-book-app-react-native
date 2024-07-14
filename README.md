# React Native Phone Book App

A simulated phone book application built with React Native, allowing users to manage contacts, simulate dialing numbers, and handle incoming and outgoing calls.

## Features

- View and manage contacts
- Simulate incoming calls
- Dial phone numbers
- Simulate outgoing calls
- Display keypad during calls

## Demo Data

The app uses the following dummy data for demonstration purposes:

```javascript
const contactsData = {
  users: [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+1-2025550101",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      phoneNumber: "+1-4155550199",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      phoneNumber: "+44-2055550156",
    },
    {
      id: 4,
      firstName: "Emily",
      lastName: "Brown",
      phoneNumber: "+61-255550103",
    },
    {
      id: 5,
      firstName: "David",
      lastName: "Wilson",
      phoneNumber: "+49-3055550178",
    },
  ],
};
```

## Usage Instructions

1. **View Contacts**: Launch the app to see the list of contacts.

2. **Simulate Incoming Call**:

   - Press the "Get a number" button to simulate an incoming call.

3. **Make an Outgoing Call**:

   - Enter a complete phone number in the dialer.
   - The green call button will become active once a valid number is entered.
   - Click the green call button to simulate an outgoing call.

4. **During an Active Call**:
   - The ongoing call screen will be displayed.
   - Click the keypad button to show the keypad.
   - Click the hide button to hide the keypad.

## Note

This app is a simulation and does not have actual calling functionality. It is designed to demonstrate the user interface and flow of a phone book application.

## Installation and Running the App

1. Clone the repository:

```
git clone https://github.com/EffiEmmanuel/phone-book-app-react-native.git

cd react-native-phone-book
```

2. Install dependencies:

```
npm install
```

3. Start the Expo development server:

```
npx expo start
```

4. Use the Expo Go app on your mobile device to scan the QR code from the terminal to launch the app.

## Technologies Used

- Typescript
- React Native
- Expo
- Ionicons

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or a pull request on the [GitHub repository](https://github.com/EffiEmmanuel/phone-book-app-react-native).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
