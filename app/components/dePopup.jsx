'use client';

import React from 'react';
import Image from 'next/image';
import { CustomizeButton } from './inputComponent/button';
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';

export const DelExPopup = ({ species, text }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {species == 'export' ? (
        <div>
          <Button
            onPress={onOpen}
            className='border-littlepink h-[33px] w-full rounded-2xl border bg-peach px-2 text-base text-white drop-shadow-md'
          >
            Export
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement='center'
            className='backdrop-bg-darkgrey/30 h-[391px] w-[303px] bg-peach text-cherry'
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody className='items-center justify-center'>
                    <Image
                      src='/iconCheckMark.svg'
                      className='inline object-center'
                      alt='add text icon'
                      width={113.85}
                      height={113.85}
                      quality={100}
                    />
                    <p className='text-2xl text-darkgrey'> Export Complete! </p>
                    <Button
                      onPress={onClose}
                      className='border-littlepink h-[33px] w-[150px] rounded-2xl border bg-cherry px-2 text-base text-white drop-shadow-md'
                    >
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
          <Button
            onPress={onOpen}
            className='border-littlepink flex h-[33px] w-full items-center justify-center gap-2 rounded-2xl border bg-winered px-2 text-base text-white drop-shadow-md'
          >
            <Image
              src='/iconTrash.svg'
              className='inline'
              alt='delete icon'
              width={20}
              height={20}
              quality={100}
            />
            Delete
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement='center'
            className='backdrop-bg-darkgrey/30 h-[391px] w-[303px] bg-peach text-cherry'
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody className='items-center justify-center '>
                    <Image
                      src='/iconTrashDropShadow.svg'
                      className='inline object-center '
                      alt='delete icon'
                      width={80}
                      height={69.99}
                      quality={100}
                    />
                    <p className=' text-center text-2xl text-winered'>
                      {' '}
                      Are you sure?
                    </p>
                    <p className=' w-[261px] text-center text-base text-darkgrey'>
                      {' '}
                      Do you really want to delete this Tier List?
                    </p>

                    <Button
                      onPress={onClose}
                      className='border-littlepink flex h-[33px] w-[150px] items-center justify-center gap-2 rounded-2xl border bg-winered px-2 text-base text-white drop-shadow-md'
                    >
                      <Image
                        src='/iconTrash.svg'
                        className='inline'
                        alt='delete icon'
                        width={20}
                        height={20}
                        quality={100}
                      />
                      Delete
                    </Button>

                    <Button
                      onPress={onClose}
                      className='border-littlepink flex h-[33px] w-[150px] items-center justify-center gap-2 rounded-2xl border bg-cherry px-2 text-base text-white drop-shadow-md'
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
          <Button
            onPress={onOpen}
            className='border-littlepink flex h-[33px] w-full items-center justify-center gap-2 rounded-2xl border bg-winered px-2 text-base text-white drop-shadow-md'
          >
            <Image
              src='/iconTrash.svg'
              className='inline'
              alt='delete icon'
              width={20}
              height={20}
              quality={100}
            />
            {text}
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement='center'
            className='backdrop-bg-darkgrey/30 h-[391px] w-[303px] bg-peach text-cherry'
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody className='items-center justify-center '>
                    <Image
                      src='/iconTrashDropShadow.svg'
                      className='inline object-center '
                      alt='delete icon'
                      width={80}
                      height={69.99}
                      quality={100}
                    />
                    <p className=' text-center text-2xl text-winered'>
                      {' '}
                      Are you sure?
                    </p>
                    <p className=' w-[261px] text-center text-base text-darkgrey'>
                      {' '}
                      Do you really want to delete this Tier List row?
                    </p>

                    <Button
                      onPress={onClose}
                      className='border-littlepink flex h-[33px] w-[150px] items-center justify-center gap-2 rounded-2xl border bg-winered px-2 text-base text-white drop-shadow-md'
                    >
                      <Image
                        src='/iconTrash.svg'
                        className='inline'
                        alt='delete icon'
                        width={20}
                        height={20}
                        quality={100}
                      />
                      Delete
                    </Button>

                    <Button
                      onPress={onClose}
                      className='border-littlepink flex h-[33px] w-[150px] items-center justify-center gap-2 rounded-2xl border bg-cherry px-2 text-base text-white drop-shadow-md'
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
};
