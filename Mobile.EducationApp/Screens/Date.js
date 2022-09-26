import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    Button,
    Modal,
    Platform,
} from 'react-native';
const isAndroid = Platform.OS === 'android';
const Wrapper = ({ children, condition, wrapper }) =>
    condition ? wrapper(children) : children;

const ModalWrapper = ({
}) => (
    <Modal
        visible={show}

    >
    </Modal>
);

function DateTimePickerModal({
    children,
    onChange,
    touchableStyle,
    modalOverlayStyle,
    modalStyle,
    modalButtonContainer,
    modalButtonStyle,
    modalButtonText,
    ...props
}) {
    const [show, setshow] = useState(false);
    const [hide, sethide] = useState(true);
    const [value, setValue] = useState(new Date());

    function opendate() {
        setshow(true);

    }
    return (

        <>

            <Wrapper
                condition={!isAndroid}
                wrapper={children => (
                    <>
                        <ModalWrapper
                            show={show}
                            close={hide}
                            modalOverlayStyle={modalOverlayStyle}
                            modalStyle={modalStyle}
                            modalButtonContainer={modalButtonContainer}
                            modalButtonStyle={modalButtonStyle}
                            modalButtonText={modalButtonText}
                        >
                            {children}
                        </ModalWrapper>

                    </>
                )}
            >
                {show && (
                    <>
                        <DateTimePicker
                            // {...props}
                            value={value}
                            onChange={(setValue, date) => {
                                if (isAndroid) {
                                    toggle();
                                }

                                if (date) {
                                    onChange(setValue, date);
                                }
                            }}
                        />

                    </>
                )}
            </Wrapper>
            <Button title='fdsasdfghgfdc' onPress={opendate} />
        </>
    );
};

export default DateTimePickerModal;