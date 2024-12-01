"use client";
import React, { useState } from "react";
import { AptosClient, AptosAccount, Types } from "aptos";
import { useWallet } from "@/hooks/useWallet"; 

const NODE_URL = "https://fullnode.devnet.aptoslabs.com"; 
const client = new AptosClient(NODE_URL);

const AddUserForm: React.FC = () => {
  const { walletState } = useWallet(); 
  const [form, setForm] = useState({
    name: "",
    bio: "",
    profileImageUrl: "",
    username: "",
    skills: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = async (
    account: AptosAccount,
    name: string,
    bio: string,
    profileImageUrl: string,
    username: string,
    skills: string[]
  ) => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function:
        "7599feca0cc8b286b3e23f5aa76081fc4367048e308a2bbe22115100884dad6f::UserManager::add_user", 
      type_arguments: [],
      arguments: [name, bio, profileImageUrl, username, skills],
    };

    try {
      const rawTransaction = await client.generateTransaction(
        account.address(),
        payload
      );

    
      const signedTransaction = await client.signTransaction(
        account,
        rawTransaction
      );

    
      const response = await client.submitTransaction(signedTransaction);

    
      await client.waitForTransaction(response.hash);

      console.log("Transaction successful:", response);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletState?.address) {
      alert("Please connect your wallet first!");
      return;
    }

    
    const privateKeyHex =
      "0xcdef3caa12de24c56ee84e28c03f402330f8b32d8ccf8fc06d280d2a209c2841"; 
    const account = new AptosAccount(
      Uint8Array.from(Buffer.from(privateKeyHex, "hex"))
    );

    const skillsArray = form.skills.split(",").map((skill) => skill.trim());

    await addUser(
      account,
      form.name,
      form.bio,
      form.profileImageUrl,
      form.username,
      skillsArray
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <textarea
        name="bio"
        placeholder="Bio"
        value={form.bio}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="profileImageUrl"
        placeholder="Profile Image URL"
        value={form.profileImageUrl}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="skills"
        placeholder="Skills (comma-separated)"
        value={form.skills}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
