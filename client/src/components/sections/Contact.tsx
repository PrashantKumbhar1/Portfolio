import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const serviceId = "service_z99kepf";
    const templateId = "template_se0l83o";
    const publicKey = "muxiwr4l_a10uDG75";

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message
        },
        publicKey
      )
      .then(() => {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I’ll get back to you soon."
        });
        form.reset();
      })
      .catch(() => {
        toast({
          title: "Error Sending Message",
          description: "Please try again later or email me directly.",
          variant: "destructive"
        });
      });
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="container px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-display font-semibold">
              Let’s Connect
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              I’m currently open to internships and collaborations. If you’d
              like to discuss a project, opportunity, or just say hello, feel
              free to reach out.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email",
                  value: "kumbharprashant494@gmail.com",
                  href: "mailto:kumbharprashant494@gmail.com"
                },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  label: "LinkedIn",
                  value: "linkedin.com/in/prashant-kumbhar",
                  href: "https://www.linkedin.com/in/prashant-kumbhar-784920356/"
                },
                {
                  icon: <Github className="w-5 h-5" />,
                  label: "GitHub",
                  value: "github.com/PrashantKumbhar1",
                  href: "https://github.com/PrashantKumbhar1"
                }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4
                             hover:text-primary transition-colors"
                >
                  <div
                    className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center
                               group-hover:bg-primary/20 transition-all
                               group-hover:scale-105"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-sm text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="font-medium">
                      {item.value}
                    </span>
                  </div>
                </a>
              ))}

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-muted-foreground">
                    Location
                  </span>
                  <span className="font-medium">
                    Thane, Maharashtra, India
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="bg-secondary/30 border-white/5">
              <CardContent className="p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your Name"
                              className="bg-background/50 border-white/10
                                         focus-visible:ring-primary/40"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="your@email.com"
                              className="bg-background/50 border-white/10
                                         focus-visible:ring-primary/40"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="How can I help you?"
                              className="min-h-[120px] bg-background/50 border-white/10
                                         focus-visible:ring-primary/40"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-primary text-background hover:bg-primary/90 font-semibold"
                    >
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
