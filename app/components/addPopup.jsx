'use client'

import React from "react";
import Image from "next/image";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {NextUIProvider} from "@nextui-org/react";

export default function AddPopup() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    <NextUIProvider>
      <Button onPress={onOpen}
      className="items-center justify-center h-[70px] w-[70px] rounded-lg bg-peach drop-shadow-md">
      <Image
                src= "/iconPluscherry.svg"
                className="inline"
                alt="add text icon"
                width={40}
                height={40}
                quality={100}
                />
      </Button>
      <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      placement = 'center'
      classNames={{
        backdrop: "bg-darkgrey/30",
        base: "dark:bg-mint text-cherry",
      }}>
        <ModalContent>
          {(onClose) => (
            <>
            <ModalHeader className="">Title Name</ModalHeader>
              <ModalBody>
                <p>
                  Input button
                </p>
              </ModalBody>
            <ModalHeader className="">Add Photo</ModalHeader>
              <ModalBody>
                <p>
                  Input Photo
                </p>
              </ModalBody>
              <ModalFooter className="items-center justify-center">
                {/* <button type={'btncherry'} text ={"Cancel"}/>*/}
                <Button onPress={onClose}>
                  Cancel
                </Button>
                {/* <button type={'btnpeach'} text ={"Add"}/>*/}
                <Button onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </NextUIProvider>
    </>
  );
}
