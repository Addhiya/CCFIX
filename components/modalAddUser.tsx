import { faEye, faEyeSlash, faPlus } from "@fortawesome/free-solid-svg-icons";
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
type ModalAddUserProps = {
  fetchUserData: () => void; // Adjust the type according to your function signature
};
export default function ModalAddUser({ fetchUserData }: ModalAddUserProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false); // Ensure component is mounted
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle password visibility
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Handle registration form submission
  const handleRegister = async () => {
    if (!mounted) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://cc-be-beta.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          nim,
          password,
          role,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      fetchUserData();
      setEmail('');
      setConfirmPassword('');
      setName('');
      setNim('');
      setPassword('');
      setRole('');
  
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        isIconOnly
        color="primary"
        className="dark:text-default-50"
        size="lg"
        onPress={onOpen}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add User
              </ModalHeader>
              <ModalBody>
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="text"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  label="NIM"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                />
                <RadioGroup
                  size="sm"
                  label={<p className="text-small">Select Role</p>}
                  orientation="horizontal"
                  value={role}
                  onValueChange={setRole}
                >
                  <Radio value="USER">User</Radio>
                  <Radio value="ADMIN">Admin</Radio>
                </RadioGroup>
                <Input
                  label="Password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <FontAwesomeIcon
                          className="text-default-500"
                          icon={faEye}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="text-default-500"
                          icon={faEyeSlash}
                        />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  label="Password Confirmation"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p className="text-red-600">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  variant="shadow"
                  className="bg-gradient-to-r from-red-800 to-red-600 text-white font-semibold"
                  onClick={onClose}
                  onTouchStart={handleRegister}
                  onPress={handleRegister}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
