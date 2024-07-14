import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import CountryPicker from "rn-country-picker";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

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

export default function HomeScreen() {
  const [countryCode, setCountryCode] = useState<string>("231");
  const [phoneNumber, setPhoneNumber] = useState<string>("+1-");
  const [currentCountryFlag, SetcurrentCountryFlag] = useState();

  const selectedValue = (value: any) => {
    console.log("COUNTRY CODE:", value);
    setCountryCode(value?.callingCode);
    SetcurrentCountryFlag(value?.flag);
    setPhoneNumber(`+${value?.callingCode}-`);
  };

  const updatePhoneNumber = (value: any) => {
    let updatedPhoneNumber = "";
    handleSearch(updatedPhoneNumber);
    setPhoneNumber((prevPhoneNumber) => {
      updatedPhoneNumber = `${prevPhoneNumber}${value}`;
      handleSearch(updatedPhoneNumber);
      return updatedPhoneNumber;
    });
  };

  const deleteCharacter = useCallback(() => {
    let updatedPhoneNumber = "";
    setPhoneNumber((prevPhoneNumber) => {
      if (prevPhoneNumber.charAt(prevPhoneNumber.length - 1) == "-")
        return `${phoneNumber}`;
      updatedPhoneNumber = prevPhoneNumber.slice(0, -1);
      handleSearch(updatedPhoneNumber);
      return updatedPhoneNumber;
    });
  }, [phoneNumber]);

  // Search data
  const [matchingUser, setMatchingUser] = useState<any>();
  const handleSearch = (phoneNumber: string) => {
    console.log("Searching...", phoneNumber);
    // Simulate searching/filtering based on input
    const filteredUser = contactsData.users.filter(
      (contact) => contact.phoneNumber == phoneNumber
    );

    console.log("FUSER:", filteredUser);
    if (filteredUser) {
      setMatchingUser(filteredUser);
    } else {
      setMatchingUser([]);
    }
  };

  // Ongoing call modal
  const [isOngoingCallModalVisible, setisOngoingCallModalVisible] =
    useState(false);
  const [isKeypadActive, setIsKeypadActive] = useState(false);

  // Incoming call modal
  const [isIncomingCallModalVisible, setisIncomingCallModalVisible] =
    useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: "#FFF" }}>
      <StatusBar networkActivityIndicatorVisible />
      {/* Ongoing call modal */}
      <Modal
        visible={isOngoingCallModalVisible}
        onRequestClose={() => setisOngoingCallModalVisible(false)}
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            paddingTop: 60,
            paddingHorizontal: 15,
          }}
        >
          <View style={styles.flexRow}>
            <Text>Calling from Whatsapp</Text>
            <Text>{phoneNumber}</Text>
          </View>

          {/* Caller details */}
          <View style={styles.callerDetailsContainer}>
            <View style={styles.callerPictureContainer}>
              <Ionicons name="person-circle" size={110} color="#A5A5A5" />
            </View>

            <View style={styles.callerCredContainer}>
              <Text style={{ textAlign: "center", ...styles.textActive }}>
                Calling...
              </Text>
              <Text
                style={{ textAlign: "center", ...styles.phoneNumberCalling }}
              >
                {phoneNumber}
              </Text>
              <Text style={{ textAlign: "center", ...styles.textIdle }}>
                Houston, TX
              </Text>
            </View>

            {/* Buttons */}
            <View
              style={{
                ...styles.buttonsSectionContainer,
                padding: 10,
                width: "90%",
              }}
            >
              {!isKeypadActive && (
                <>
                  {/* Mute, keypad, speaker */}
                  <View style={{ ...styles.buttonsSection }}>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => {}}
                    >
                      <Ionicons name="mic-off" size={40} color="#5E5E5E" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => setIsKeypadActive(true)}
                    >
                      <Ionicons name="keypad" size={35} color="#5E5E5E" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => {}}
                    >
                      <Ionicons name="volume-high" size={35} color="#5E5E5E" />
                    </TouchableOpacity>
                  </View>

                  {/* Message, contacts */}
                  <View style={{ ...styles.buttonsSection }}>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => {}}
                    >
                      <Ionicons name="chatbox" size={30} color="#5E5E5E" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => {}}
                    >
                      <Ionicons
                        name="person-circle"
                        size={35}
                        color="#5E5E5E"
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {isKeypadActive && (
                <>
                  {/* 1-3 */}
                  <View style={styles.buttonsSection}>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => updatePhoneNumber("1")}
                    >
                      <Text style={styles.numberButtonText}>1</Text>
                      <Ionicons name="recording-outline" size={10} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => updatePhoneNumber("2")}
                    >
                      <Text style={styles.numberButtonText}>2</Text>
                      <Text style={styles.numberButtonSubtext}>ABC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => updatePhoneNumber("3")}
                    >
                      <Text style={styles.numberButtonText}>3</Text>
                      <Text style={styles.numberButtonSubtext}>DEF</Text>
                    </TouchableOpacity>
                  </View>

                  {/* 4-6 */}
                  <View style={styles.buttonsSection}>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => updatePhoneNumber("4")}
                    >
                      <Text style={styles.numberButtonText}>4</Text>
                      <Text style={styles.numberButtonSubtext}>GHI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => updatePhoneNumber("5")}
                    >
                      <Text style={styles.numberButtonText}>5</Text>
                      <Text style={styles.numberButtonSubtext}>JKL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => updatePhoneNumber("6")}
                    >
                      <Text style={styles.numberButtonText}>6</Text>
                      <Text style={styles.numberButtonSubtext}>MNO</Text>
                    </TouchableOpacity>
                  </View>

                  {/* 7-9 */}
                  <View style={styles.buttonsSection}>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => updatePhoneNumber("7")}
                    >
                      <Text style={styles.numberButtonText}>7</Text>
                      <Text style={styles.numberButtonSubtext}>PQRS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => updatePhoneNumber("8")}
                    >
                      <Text style={styles.numberButtonText}>8</Text>
                      <Text style={styles.numberButtonSubtext}>TUV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => updatePhoneNumber("9")}
                    >
                      <Text style={styles.numberButtonText}>9</Text>
                      <Text style={styles.numberButtonSubtext}>WXYZ</Text>
                    </TouchableOpacity>
                  </View>

                  {/* *-# */}
                  <View style={styles.buttonsSection}>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => updatePhoneNumber("*")}
                    >
                      <Text style={styles.numberButtonText}>*</Text>
                      <Text style={styles.numberButtonSubtext}> </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => updatePhoneNumber("0")}
                      onLongPress={() => updatePhoneNumber("+")}
                    >
                      <Text style={styles.numberButtonText}>0</Text>
                      <Text style={styles.numberButtonSubtext}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.numberButton}
                      onPress={() => updatePhoneNumber("3")}
                    >
                      <Text style={styles.numberButtonText}>#</Text>
                      <Text style={styles.numberButtonSubtext}> </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {/* Action buttons */}
              <View
                style={{
                  ...styles.buttonsSection,
                  justifyContent: isKeypadActive ? "flex-end" : "center",
                  gap: isKeypadActive ? 24 : 0,
                  marginTop: isKeypadActive ? 20 : 90,
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.callButtonActive,
                    backgroundColor: "#FD3C2E",
                  }}
                  onPress={() => setisOngoingCallModalVisible(false)}
                >
                  <Ionicons
                    name="call"
                    size={34}
                    style={{ transform: "rotate(135deg)" }}
                    color="#FFF"
                  />
                </TouchableOpacity>

                {isKeypadActive && (
                  <TouchableOpacity
                    style={{
                      ...styles.callButtonActive,
                      backgroundColor: "transparent",
                      gap: 2,
                    }}
                    onPress={() => setIsKeypadActive(false)}
                  >
                    <Ionicons name="chevron-down" size={34} color="#5E5E5E" />

                    <Text>Hide</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Incoming call modal */}
      <Modal
        visible={isIncomingCallModalVisible}
        onRequestClose={() => setisIncomingCallModalVisible(false)}
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            paddingTop: 60,
            paddingHorizontal: 15,
          }}
        >
          <View style={styles.flexRow}>
            <Text>Calling from Whatsapp</Text>
            <Text>+1-2059276258</Text>
          </View>

          {/* Caller details */}
          <View style={styles.callerDetailsContainer}>
            <View style={styles.callerPictureContainer}>
              <Ionicons name="person-circle" size={110} color="#A5A5A5" />
            </View>

            <View style={styles.callerCredContainer}>
              <Text style={{ textAlign: "center", ...styles.textActive }}>
                Call from
              </Text>
              <Text
                style={{ textAlign: "center", ...styles.phoneNumberCalling }}
              >
                +1-2059276258
              </Text>
              <Text style={{ textAlign: "center", ...styles.textIdle }}>
                Houston, TX
              </Text>
            </View>

            {/* Buttons */}
            <View
              style={{
                ...styles.buttonsSectionContainer,
                padding: 10,
                width: "90%",
              }}
            >
              {/* Action buttons */}
              <View
                style={{
                  ...styles.buttonsSection,
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  height: "75%",
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.callButtonActive,
                    backgroundColor: "#FD3C2E",
                  }}
                  onPress={() => setisIncomingCallModalVisible(false)}
                >
                  <Ionicons
                    name="call"
                    size={34}
                    style={{ transform: "rotate(135deg)" }}
                    color="#FFF"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    ...styles.callButtonActive,
                    backgroundColor: "#33D059",
                  }}
                  onPress={() => setisIncomingCallModalVisible(false)}
                >
                  <Ionicons name="call" size={34} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.pageContainer}>
        {/* "Get a number" view */}
        {(matchingUser?.length < 1 || !matchingUser) && (
          <View style={styles.getANumberContainer}>
            <TouchableOpacity
              style={styles.getANumberButton}
              onPress={() => setisIncomingCallModalVisible(true)}
            >
              <Ionicons name="call" size={16} color="#FFF" />
              <ThemedText lightColor="#FFF">Get a number</ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {/* "Existing number" view */}
        {matchingUser?.length > 0 && (
          <View
            style={{
              ...styles.getANumberContainer,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                ...styles.getANumberButton,
                backgroundColor: "transparent",
                gap: 10,
              }}
              onPress={() => setisIncomingCallModalVisible(true)}
            >
              <View style={styles.countryFlagsSelectContainer}>
                <CountryPicker
                  animationType={"fade"}
                  language="en"
                  countryCode={countryCode}
                  selectedValue={selectedValue}
                  hideCountryCode
                  pickerContainerStyle={{
                    width: "100%",
                    marginLeft: -1,
                    height: 32,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    margin: 0,
                    borderColor: "transparent",
                    borderWidth: 1,
                  }}
                  dropDownIconStyle={{
                    display: "none",
                  }}
                  countryFlagStyle={{
                    borderRadius: 100,
                    height: 23,
                    width: 23,
                  }}
                  countryId="231"
                />
              </View>
              <Text>{phoneNumber}</Text>
              <Ionicons name="chevron-down" size={14} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 5,
                height: 28,
                width: 28,
                borderColor: "#DBDBDB",
                borderWidth: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="add" size={16} />
            </TouchableOpacity>
          </View>
        )}

        {/* Topup container */}
        <View
          style={{
            ...styles.topupContainer,
            marginVertical: matchingUser?.length > 0 ? 0 : 10,
          }}
        >
          <View style={styles.flexRow}>
            <Ionicons name="diamond-outline" size={18} color="#5F6368" />
            <Text>Balance: 0 CR.</Text>
          </View>

          <View style={styles.flexRow}>
            <Text>Top up</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#5F6368"
            />
          </View>
        </View>

        {/* Phone number input row */}
        <View style={styles.phoneNumberRowContainer}>
          {/* Country flag select */}
          <View style={styles.countryFlagsSelectContainer}>
            <CountryPicker
              animationType={"fade"}
              language="en"
              countryCode={countryCode}
              selectedValue={selectedValue}
              hideCountryCode
              pickerContainerStyle={{
                width: "100%",
                marginLeft: -1,
                height: 32,
                paddingHorizontal: 20,
                borderRadius: 8,
                margin: 0,
                borderColor: "#DBDBDB",
                borderWidth: 1,
              }}
              dropDownIconStyle={{
                width: 10,
              }}
              countryFlagStyle={{ borderRadius: 100, height: 23, width: 23 }}
              countryId="231"
            />
          </View>

          {/* Phone number input */}
          <View style={styles.phoneNumberInputContainer}>
            <Text style={styles.phoneNumberInput}>{phoneNumber}</Text>
          </View>

          {/* Delete button */}
          <TouchableWithoutFeedback
            style={styles.deleteButton}
            onPress={() => deleteCharacter()}
          >
            <Ionicons name="backspace-outline" size={28} color="#383838" />
          </TouchableWithoutFeedback>
        </View>

        {/* Add to contacts */}
        <View style={styles.addToContactsContainer}>
          {matchingUser?.length > 0 ? (
            <View
              style={{ flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <Text style={{ textAlign: "center" }}>
                {matchingUser[0]?.firstName} {matchingUser[0]?.lastName}
              </Text>
              <Text style={{ textAlign: "center", color: "#7C7C7C" }}>
                $0.01/min
              </Text>
            </View>
          ) : null}

          {phoneNumber?.length > 12 && matchingUser?.length < 1 && (
            <TouchableOpacity style={styles.addToContactsButton}>
              <Text style={styles.addToContactsText}>Add to contacts</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonsSectionContainer}>
          {/* 1-3 */}
          <View style={styles.buttonsSection}>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => updatePhoneNumber("1")}
            >
              <Text style={styles.numberButtonText}>1</Text>
              <Ionicons name="recording-outline" size={10} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => updatePhoneNumber("2")}
            >
              <Text style={styles.numberButtonText}>2</Text>
              <Text style={styles.numberButtonSubtext}>ABC</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => updatePhoneNumber("3")}
            >
              <Text style={styles.numberButtonText}>3</Text>
              <Text style={styles.numberButtonSubtext}>DEF</Text>
            </TouchableOpacity>
          </View>

          {/* 4-6 */}
          <View style={styles.buttonsSection}>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => updatePhoneNumber("4")}
            >
              <Text style={styles.numberButtonText}>4</Text>
              <Text style={styles.numberButtonSubtext}>GHI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => updatePhoneNumber("5")}
            >
              <Text style={styles.numberButtonText}>5</Text>
              <Text style={styles.numberButtonSubtext}>JKL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => updatePhoneNumber("6")}
            >
              <Text style={styles.numberButtonText}>6</Text>
              <Text style={styles.numberButtonSubtext}>MNO</Text>
            </TouchableOpacity>
          </View>

          {/* 7-9 */}
          <View style={styles.buttonsSection}>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => updatePhoneNumber("7")}
            >
              <Text style={styles.numberButtonText}>7</Text>
              <Text style={styles.numberButtonSubtext}>PQRS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => updatePhoneNumber("8")}
            >
              <Text style={styles.numberButtonText}>8</Text>
              <Text style={styles.numberButtonSubtext}>TUV</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => updatePhoneNumber("9")}
            >
              <Text style={styles.numberButtonText}>9</Text>
              <Text style={styles.numberButtonSubtext}>WXYZ</Text>
            </TouchableOpacity>
          </View>

          {/* *-# */}
          <View style={styles.buttonsSection}>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => updatePhoneNumber("*")}
            >
              <Text style={styles.numberButtonText}>*</Text>
              <Text style={styles.numberButtonSubtext}> </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => updatePhoneNumber("0")}
              onLongPress={() => updatePhoneNumber("+")}
            >
              <Text style={styles.numberButtonText}>0</Text>
              <Text style={styles.numberButtonSubtext}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => updatePhoneNumber("3")}
            >
              <Text style={styles.numberButtonText}>#</Text>
              <Text style={styles.numberButtonSubtext}> </Text>
            </TouchableOpacity>
          </View>

          {/* Action buttons */}
          <View style={styles.buttonsSection}>
            <TouchableOpacity style={styles.sideActionButton}>
              <Ionicons name="timer-outline" size={24} color="#5F6368" />
              <Text style={styles.numberButtonSubtext}>History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={phoneNumber?.length < 13}
              style={
                phoneNumber?.length < 13
                  ? styles.callButtonIdle
                  : styles.callButtonActive
              }
              onPress={() => setisOngoingCallModalVisible(true)}
            >
              <Ionicons
                name="call"
                size={34}
                color={phoneNumber?.length < 13 ? "#DBDBDB" : "#232323"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sideActionButton}
              onPress={() => updatePhoneNumber("3")}
            >
              <Ionicons
                name="person-circle-outline"
                size={24}
                color="#5F6368"
              />
              <Text style={styles.numberButtonSubtext}>Contacts</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  callerDetailsContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    width: "100%",
    marginTop: 30,
  },

  callerPictureContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 110,
    width: 110,
    backgroundColor: "#FFF",
    borderRadius: 600,
  },

  callerCredContainer: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 6,
  },

  phoneNumberCalling: {
    fontSize: 32,
    fontWeight: "bold",
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  getANumberContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  phoneNumberRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  getANumberButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#383838",
    padding: 6,
    borderRadius: 5,
  },

  pageContainer: {
    padding: 15,
    minHeight: Dimensions.get("screen").height,
    backgroundColor: "#fff",
  },

  phoneNumberInput: {
    width: "auto",
    height: "auto",
    fontSize: 24,
    textAlign: "center",
    marginLeft: -15,
  },

  phoneNumberInputContainer: {
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  countryFlagsSelectContainer: {
    maxWidth: "15%",
    width: "15%",
    minWidth: "15%",
    padding: 0,
    display: "flex",
    justifyContent: "center",
  },

  deleteButton: {
    width: "15%",
  },

  addToContactsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },

  addToContactsText: {
    color: "#57B100",
    fontSize: 18,
  },

  addToContactsButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // Buttons
  buttonsSectionContainer: {
    flexDirection: "column",
    gap: 9,
    padding: 20,
    marginTop: 10,
  },

  buttonsSection: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  numberButton: {
    height: 75,
    width: 75,
    backgroundColor: "#F5F5F5",
    borderRadius: 400,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  callButtonIdle: {
    height: 75,
    width: 75,
    backgroundColor: "#E9FFC7",
    borderRadius: 400,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  callButtonActive: {
    height: 75,
    width: 75,
    backgroundColor: "#B9FF66",
    borderRadius: 400,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  textIdle: {
    color: "DBDBDB",
  },

  textActive: {
    color: "#232323",
  },

  sideActionButton: {
    height: 75,
    width: 75,
    borderRadius: 400,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  numberButtonText: {
    color: "#000",
    fontSize: 24,
  },

  numberButtonSubtext: {
    color: "#000",
    fontSize: 9,
  },

  topupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 300,
    padding: 14,
    backgroundColor: "#B9FF66",
    minHeight: 45,
  },

  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
  },

  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
