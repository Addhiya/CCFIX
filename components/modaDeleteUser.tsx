import { faEye, faEyeSlash, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
  MenuTriggerAction,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { useFilter } from "@react-aria/i18n";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
type ModalDeleteUserProps = {
  deleteUserData: (id:number) => void; // Adjust the type according to your function signature
  id: number; // Adjust the type according to your function signature
};
export default function ModalDeleteUser({
  deleteUserData, id
}: ModalDeleteUserProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button
        isIconOnly
        color="danger"
        className="dark:text-default-50"
        onPress={onOpen}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete User
              </ModalHeader>
              <ModalBody>
               <p className="text-lg">Are you sure want to delete this data?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  variant="shadow"
                  className="bg-gradient-to-r from-red-800 to-red-600 text-white font-semibold"
                  onClick={onClose}
                  onTouchStart={() => deleteUserData(id)}
                  onPress={() => deleteUserData(id)}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
