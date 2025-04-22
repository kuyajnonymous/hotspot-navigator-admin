
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RouterConnectionFormProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  router_ip: string;
  api_port: number;
  api_username: string;
  api_password: string;
}

export function RouterConnectionForm({ open, onClose }: RouterConnectionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      api_port: 8728
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('router_connections')
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Router connection created successfully",
      });

      queryClient.invalidateQueries({ queryKey: ['router-connections'] });
      reset();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create router connection",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Router Connection</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="router_ip">Router IP</Label>
            <Input
              id="router_ip"
              {...register("router_ip", { required: "Router IP is required" })}
            />
            {errors.router_ip && (
              <p className="text-sm text-destructive">{errors.router_ip.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="api_port">API Port</Label>
            <Input
              id="api_port"
              type="number"
              {...register("api_port", { required: "API Port is required" })}
            />
            {errors.api_port && (
              <p className="text-sm text-destructive">{errors.api_port.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="api_username">API Username</Label>
            <Input
              id="api_username"
              {...register("api_username", { required: "API Username is required" })}
            />
            {errors.api_username && (
              <p className="text-sm text-destructive">{errors.api_username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="api_password">API Password</Label>
            <Input
              id="api_password"
              type="password"
              {...register("api_password")}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
