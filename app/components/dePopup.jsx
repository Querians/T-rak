'use client'

import React from "react";
import Image from "next/image";
import { CustomizeButton } from "./button";
import {Modal, ModalContent, ModalBody, Button, useDisclosure} from "@nextui-org/react";


export const DelExPopup=({species,text}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
  <>
  {species == 'export' ? (
            <div>
                <Button onPress={onOpen}
                className="h-[33px] w-full rounded-2xl border border-1 border-littlepink bg-peach px-2 text-base text-white drop-shadow-md">
                Export
                </Button>

                <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                placement = 'center'
                className="backdrop-bg-darkgrey/30 bg-peach text-cherry w-[303px] h-[391px]">
                    <ModalContent>
                    {(onClose) => (
                        <>
                            
                            <ModalBody className="items-center justify-center">
                                <Image
                                    src= "/iconCheckMark.svg"
                                    className="inline object-center"
                                    alt="add text icon"
                                    width={113.85}
                                    height={113.85}
                                    quality={100}
                                    />
                                <p className="text-2xl text-darkgrey"> Export Complete! </p>    
                                <Button onPress={onClose}
                                        className="h-[33px] w-[150px] rounded-2xl border border-1 border-littlepink bg-cherry px-2 text-base text-white drop-shadow-md">
                                    Done
                                </Button>
                            </ModalBody>
                           
                        </>
                    )}
                    </ModalContent>
                </Modal>
            </div>
        ) : (
          <></>
    )}

{species == 'deltier' ? (
            <div>
            <Button onPress={onOpen}
            className="flex gap-2 items-center justify-center h-[33px] w-full rounded-2xl border border-1 border-littlepink bg-winered px-2 text-base text-white drop-shadow-md">
                 <Image
                src= "/iconTrash.svg"
                className="inline"
                alt="delete icon"
                width={20}
                height={20}
                quality={100}
                />
            Delete
            </Button>

            <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement = 'center'
            className="backdrop-bg-darkgrey/30 bg-peach text-cherry w-[303px] h-[391px]">
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalBody className= "items-center justify-center ">

                            <Image
                                src= "/iconTrashDropShadow.svg"
                                className="inline object-center "
                                alt="delete icon"
                                width={80}
                                height={69.99}
                                quality={100}
                                />
                            <p className=" text-2xl text-winered text-center"> Are you sure?</p>
                            <p className=" w-[261px] text-base text-darkgrey text-center"> Do you really want to delete this Tier List?</p>
                       
                            <Button onPress={onClose}
                            className= "h-[33px] w-[150px] flex gap-2 items-center justify-center rounded-2xl border border-1 border-littlepink bg-winered px-2 text-base text-white drop-shadow-md"
                            >
                                <Image
                                src= "/iconTrash.svg"
                                className="inline"
                                alt="delete icon"
                                width={20}
                                height={20}
                                quality={100}
                                />
                                Delete
                            </Button>

                            <Button onPress={onClose}
                            className="h-[33px] w-[150px] flex gap-2 items-center justify-center rounded-2xl border border-1 border-littlepink bg-cherry px-2 text-base text-white drop-shadow-md"
                            >
                                Cancle
                            </Button>
                            </ModalBody>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
        ) : (
          <></>
    )}

    {species == 'delrow' ? (
            <div>
            <Button onPress={onOpen}
            className="flex gap-2 items-center justify-center h-[33px] w-full rounded-2xl border border-1 border-littlepink bg-winered px-2 text-base text-white drop-shadow-md">
                 <Image
                src= "/iconTrash.svg"
                className="inline"
                alt="delete icon"
                width={20}
                height={20}
                quality={100}
                />
            {text}
            </Button>

            <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement = 'center'
            className="backdrop-bg-darkgrey/30 bg-peach text-cherry w-[303px] h-[391px]">
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalBody className= "items-center justify-center ">

                            <Image
                                src= "/iconTrashDropShadow.svg"
                                className="inline object-center "
                                alt="delete icon"
                                width={80}
                                height={69.99}
                                quality={100}
                                />
                            <p className=" text-2xl text-winered text-center"> Are you sure?</p>
                            <p className=" w-[261px] text-base text-darkgrey text-center"> Do you really want to delete this Tier List row?</p>
                       
                            <Button onPress={onClose}
                            className= "h-[33px] w-[150px] flex gap-2 items-center justify-center rounded-2xl border border-1 border-littlepink bg-winered px-2 text-base text-white drop-shadow-md"
                            >
                                <Image
                                src= "/iconTrash.svg"
                                className="inline"
                                alt="delete icon"
                                width={20}
                                height={20}
                                quality={100}
                                />
                                Delete
                            </Button>

                            <Button onPress={onClose}
                            className="h-[33px] w-[150px] flex gap-2 items-center justify-center rounded-2xl border border-1 border-littlepink bg-cherry px-2 text-base text-white drop-shadow-md"
                            >
                                Cancle
                            </Button>
                            </ModalBody>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
        ) : (
          <></>
    )}
  </>
  );
}