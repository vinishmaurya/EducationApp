import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Caption, Drawer, Title, useTheme, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
const DrawerContent = ({ navigation }) => {
  const [focus, setfocus] = useState('1');
  const [login, setLogin] = useState('');
  const [NestedDrawerItem, setNestedDrawerItem] = useState(false);
  const [StudentNestedDrawerItem, setStudentNestedDrawerItem] = useState(false);
  const [TimeTable, setTimeTable] = useState(false);

  const NestedDrawerItemFUN = () => {
    if (NestedDrawerItem == true) {
      setNestedDrawerItem(false);

    } else {
      setNestedDrawerItem(true);
    }
  };
  const StudentNestedDrawerItemFUN = () => {
    if (StudentNestedDrawerItem == true) {
      setStudentNestedDrawerItem(false);

    } else {
      setStudentNestedDrawerItem(true);
    }
  };
  const TimeTableFUN = () => {
    if (TimeTable == true) {
      setTimeTable(false);

    } else {
      setTimeTable(true);
    }
  };
    return (
      <DrawerContentScrollView >
        <View style={styles.userInfoSection}>
          <TouchableOpacity
          >
            <MaterialCommunityIcons
              name={"account-circle-outline"}
              size={50}
            // color='white'
            // color='white'
            />
          </TouchableOpacity>
          {/* <Title style={[styles.title]}><Text>Ankush</Text></Title> */}
          <Caption style={[styles.caption]}><Text>useremail@gmail.com</Text></Caption>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem key="Dashboard"
            icon={props => <Icon name={'home'} size={18} />}
            label="Dashboard"
            onPress={() => navigation.navigate('Dashboard')}
          />
          <DrawerItem
            key="Academics"
            icon={() => (
              <Icon name={'institution'} size={17} />
            )}
            label={({ focused, colors }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, color: '#413F42', fontWeight: '500' }}>Academics</Text>
                {NestedDrawerItem == true &&
                  <AntDesign name={'up'} size={20} />
                }
                {NestedDrawerItem == false &&
                  <AntDesign name={'down'} size={20} />
                }
              </View>
            )}
            onPress={() => {
              setfocus(1);
              NestedDrawerItemFUN()
            }
              //  navigation.navigate('screen2')
            }
          />
          {NestedDrawerItem == true &&
            <DrawerItem key="Medium" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'}/>}
              label="Medium"
              onPress={() => {
                setfocus(1);
                NestedDrawerItemFUN(),
                  navigation.navigate('Medium')
              }

              }
            />
          }
          {NestedDrawerItem == true &&
            <DrawerItem key="Role" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'}/>}
              label="Role"
              onPress={() => {
                setfocus(1);
                NestedDrawerItemFUN(),
                  navigation.navigate('Role')
              }

              }
            />
          }
          {NestedDrawerItem == true &&
            <DrawerItem key="Section" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Section"
              onPress={() => {
                setfocus(1);
                NestedDrawerItemFUN(),
                  navigation.navigate('Section')
              }

              }

            />
          }
          {NestedDrawerItem == true &&
            <DrawerItem key="Subject" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Subject"
              onPress={() => {
                setfocus(1);
                NestedDrawerItemFUN(),
                  navigation.navigate('ManageSubject')
              }

              }
            />
          }
          {NestedDrawerItem == true &&
            <DrawerItem key="Class" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Class"
              onPress={() => {
                setfocus(1);
                NestedDrawerItemFUN(),
                  navigation.navigate('ManageClass')
              }

              }
            />
          }
          {NestedDrawerItem == true &&
            <DrawerItem key="AssignClassSubject" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Assign Class Subject"
              onPress={() => {
                setfocus(1);
                NestedDrawerItemFUN(),
                  navigation.navigate('AssignClassSubject')
              }

              }
            />
          }
          {NestedDrawerItem == true &&
            <DrawerItem key="AssignClassTeacher" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Assign Class Teacher"
              onPress={() => {
                setfocus(1);
                NestedDrawerItemFUN(),
                  navigation.navigate('AssignClassTeacher')
              }}
            />
          }
          {NestedDrawerItem == true &&
            <DrawerItem key="AssignSubjectTeacher" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Assign Subject Teacher"
              onPress={() => {
                setfocus(1);
                NestedDrawerItemFUN(),
                  navigation.navigate('AssignSubjectTeacher')
              }}
            />
          }
          {NestedDrawerItem == true &&
            <DrawerItem key="AssignNewSutdentClass" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Assign New Sutdent Class"
              onPress={() => {
                setfocus(1);
                NestedDrawerItemFUN(),
                  navigation.navigate('AssignNewStudentClass')
              }}
            />
          }
          {NestedDrawerItem == true &&
            <DrawerItem key="PromoteStudent" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Promote Student"
              onPress={() => {
                setfocus(1);
                NestedDrawerItemFUN(),
                  navigation.navigate('PromoteStudent')
              }

              }
            />
          }
          <DrawerItem
            key="Students"
            icon={() => (
              <Icon name={'graduation-cap'} size={14} />
            )}
            label={({ focused, colors }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, color: '#413F42', fontWeight: '500' }}>Students</Text>
                {StudentNestedDrawerItem == true &&
                  <AntDesign name={'up'} size={20} />
                }
                {StudentNestedDrawerItem == false &&
                  <AntDesign name={'down'} size={20} />
                }
              </View>
            )}
            onPress={() => {
              setfocus(1);
              StudentNestedDrawerItemFUN()
            }
              //  navigation.navigate('screen2')
            }
          />
          {StudentNestedDrawerItem == true &&
            <DrawerItem key="StudentsAdmission" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'}/>}
              label="Students Admission"
              onPress={() => {
                setfocus(1);
                StudentNestedDrawerItemFUN()
                  navigation.navigate('StudentAdmission')
              }
              }
            />
          }
          {StudentNestedDrawerItem == true &&
            <DrawerItem key="StudentsDetails" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Students Details"
            />
          }
          {StudentNestedDrawerItem == true &&
            <DrawerItem key="StudentsCategory" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Students Category"
              onPress={() => {
                setfocus(1);
                NestedDrawerItemFUN(),
                  navigation.navigate('ManageCategory')
              }

              }
            />
          }
          {StudentNestedDrawerItem == true &&
            <DrawerItem key="StudentsResetPassword" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Students Reset Password"
              onPress={() => {
                setfocus(1);
                NestedDrawerItemFUN(),
                  navigation.navigate('StudentresetPassword')
              }

              }
            />
          }
          {/* {StudentNestedDrawerItem == true &&
            <DrawerItem key="AddBulkData" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Add Bulk Data"
            />
          } */}
          <DrawerItem key="Teacher"
            icon={props => <Icon name={'user'} size={25} />}
            label="Teacher "
           onPress={() => navigation.navigate('Teacher')}
          />
          <DrawerItem key="Parents"
            icon={props => <Icon name={'users'} size={17} />}
            label="Parents"
          onPress={() => navigation.navigate('Parents')}
          />
          <DrawerItem
            key="TimeTable"
            icon={() => (
              <Icon name={'institution'} size={17} />
            )}
            label={({ focused, colors }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, color: '#413F42', fontWeight: '500' }}>TimeTable</Text>
                {TimeTable == true &&
                  <AntDesign name={'up'} size={20} />
                }
                {TimeTable == false &&
                  <AntDesign name={'down'} size={20} />
                }
              </View>
            )}
            onPress={() => {
              setfocus(1);
              TimeTableFUN()
            }
              //  navigation.navigate('screen2')
            }
          />
          {TimeTable == true &&
            <DrawerItem key="CreateTimeTable" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'}/>}
              label="Create TimeTable"
              onPress={()=>navigation.navigate('AdminPanal')}
              
              
            />
          }
          {TimeTable == true &&
            <DrawerItem key="ClassTimeTable" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Class TimeTable"
            />
          }
          {TimeTable == true &&
            <DrawerItem key="TeachersTimeTable" style={{ marginLeft: '10%' }}
              // icon={props => <Icon name={'institution'} />}
              label="Teachers TimeTable"
            />
          }
          <DrawerItem key="Exam"
            icon={props => <Icon name={'copy'} size={17} />}
            label="Exam"
          // onPress={logOut}
          />
          <DrawerItem key="Session"
            icon={props => <Icon name={'calendar-o'} size={19} />}
            label="Session year"
            // onPress={logOut}
            onPress={() => navigation.navigate('screen1')}
          />
          <DrawerItem key="Student"
            icon={props => <Icon name={'graduation-cap'} size={25} />}
            label="Student"
            onPress={() => navigation.navigate('screen1')}
          />
          <DrawerItem key="holiday"
            icon={props => <Icon5 name={'calendar'} size={25} />}
            label="holiday List"
          // onPress={logOut}
          />
          <DrawerItem key="Announcement"
            icon={props => <Icon2 name={'announcement'} size={25} />}
            label="Announcement "
          // onPress={logOut}
          />
          <DrawerItem key="ession"
            icon={props => <Icon name={'calendar-o'} size={25} />}
            label="ession year"
          // onPress={logOut}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      marginTop: 20,
      marginTop: 20,
    },
    title: {
      marginTop: 20,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 18,
      lineHeight: 34,
      // color:'white',
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
  export default DrawerContent;