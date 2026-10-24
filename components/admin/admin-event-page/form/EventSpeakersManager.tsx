"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users, Plus, Pencil, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  type Speaker,
  type SpeakerValues,
  speakerSchema,
  DEFAULT_SPEAKER_IMAGE,
} from "./types";

interface EventSpeakersManagerProps {
  speakers: Speaker[];
  setSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
  editingSpeaker: Speaker | null;
  setEditingSpeaker: React.Dispatch<React.SetStateAction<Speaker | null>>;
}

export function EventSpeakersManager({
  speakers,
  setSpeakers,
  editingSpeaker,
  setEditingSpeaker,
}: EventSpeakersManagerProps) {
  const [speakerImagePreview, setSpeakerImagePreview] = useState<string>(
    DEFAULT_SPEAKER_IMAGE
  );
  const speakerImageInputRef = useRef<HTMLInputElement>(null);

  const speakerForm = useForm<SpeakerValues>({
    resolver: zodResolver(speakerSchema),
    defaultValues: {
      name: "",
      title: "",
      bio: "",
      image: DEFAULT_SPEAKER_IMAGE,
    },
  });

  useEffect(() => {
    if (editingSpeaker) {
      speakerForm.reset({
        name: editingSpeaker.name,
        title: editingSpeaker.title,
        bio: editingSpeaker.bio,
        image: editingSpeaker.image,
      });
      setSpeakerImagePreview(editingSpeaker.image);
    } else {
      speakerForm.reset({
        name: "",
        title: "",
        bio: "",
        image: DEFAULT_SPEAKER_IMAGE,
      });
      setSpeakerImagePreview(DEFAULT_SPEAKER_IMAGE);
    }
  }, [editingSpeaker, speakerForm]);

  const handleSpeakerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      speakerForm.setValue("image", base64String);
      setSpeakerImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const onSpeakerSubmit = (values: SpeakerValues) => {
    if (editingSpeaker && speakers.find((s) => s.id === editingSpeaker.id)) {
      const updatedSpeakers = speakers.map((s) =>
        s.id === editingSpeaker.id ? { ...s, ...values } : s
      );
      setSpeakers(updatedSpeakers);
      toast.success("Speaker updated successfully");
    } else {
      const newSpeaker: Speaker = {
        id: Date.now().toString(),
        ...values,
      };
      setSpeakers([...speakers, newSpeaker]);
      toast.success("Speaker added successfully");
    }
    cancelEditSpeaker();
  };

  const addSpeaker = () => {
    setEditingSpeaker({
      id: Date.now().toString(),
      name: "",
      title: "",
      bio: "",
      image: DEFAULT_SPEAKER_IMAGE,
    });
  };

  const editSpeaker = (speaker: Speaker) => {
    setEditingSpeaker(speaker);
  };

  const cancelEditSpeaker = () => {
    setEditingSpeaker(null);
    speakerForm.reset();
    setSpeakerImagePreview(DEFAULT_SPEAKER_IMAGE);
  };

  const deleteSpeaker = (id: string) => {
    setSpeakers(speakers.filter((s) => s.id !== id));
    toast.success("Speaker removed");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-base font-semibold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Event Speakers
        </label>
        <Button
          type="button"
          size="sm"
          onClick={addSpeaker}
          disabled={editingSpeaker !== null}
          className="border-primary/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Speaker
        </Button>
      </div>

      {speakers.length > 0 && !editingSpeaker && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="glass rounded-xl p-4 group hover:border-primary/30 transition-all border border-border/50 bg-card/40"
            >
              <div className="flex gap-3">
                <Image
                  src={speaker.image || DEFAULT_SPEAKER_IMAGE}
                  alt={speaker.name}
                  width={60}
                  height={60}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">{speaker.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{speaker.title}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => editSpeaker(speaker)}
                  className="flex-1 h-8"
                >
                  <Pencil className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteSpeaker(speaker.id)}
                  className="flex-1 h-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingSpeaker && (
        <div className="bg-background/50 border border-border/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            {speakers.find((s) => s.id === editingSpeaker.id) ? "Edit Speaker" : "New Speaker"}
          </h3>

          <Form {...speakerForm}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="shrink-0">
                  <Image
                    src={speakerImagePreview}
                    alt="Speaker preview"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <input
                    type="file"
                    ref={speakerImageInputRef}
                    onChange={handleSpeakerImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => speakerImageInputRef.current?.click()}
                    className="mt-2"
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Upload
                  </Button>
                </div>

                <div className="space-y-4">
                  <FormField
                    control={speakerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Speaker Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Full name"
                            {...field}
                            className="bg-background/50 border-border/50 focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={speakerForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Speaker Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., CTO at Acme Corp"
                            {...field}
                            className="bg-background/50 border-border/50 focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={speakerForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Speaker Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief bio about the speaker..."
                        {...field}
                        rows={3}
                        className="bg-background/50 border-border/50 focus:border-primary resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button type="button" onClick={cancelEditSpeaker} variant="outline">
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={speakerForm.handleSubmit(onSpeakerSubmit)}
                  className="bg-primary hover:bg-primary/90"
                >
                  {speakers.find((s) => s.id === editingSpeaker.id) ? "Update" : "Add"} Speaker
                </Button>
              </div>
            </div>
          </Form>
        </div>
      )}

      {speakers.length === 0 && !editingSpeaker && (
        <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-lg bg-muted/20">
          <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No speakers added yet</p>
        </div>
      )}
    </div>
  );
}
