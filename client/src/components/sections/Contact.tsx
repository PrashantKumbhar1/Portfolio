import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Replace these with your actual EmailJS credentials
    // Sign up at https://www.emailjs.com/
    const serviceId = 'service_z99kepf';
    const templateId = 'template_se0l83o';
    const publicKey = 'muxiwr4l_a10uDG75';

    emailjs.send(serviceId, templateId, {
      from_name: values.name,
      from_email: values.email,
      message: values.message,
    }, publicKey)
    .then((result) => {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
    }, (error) => {
        toast({
          title: "Error Sending Message",
          description: "Please try again later or email me directly.",
          variant: "destructive"
        });
        console.log(error.text);
    });
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-display font-semibold mb-6">Let's Connect</h3>
            <p className="text-muted-foreground mb-8">
              I'm currently looking for internships and opportunities in Software Development and Cybersecurity. 
              Feel free to reach out for collaborations or just to say hi!
            </p>

            <div className="space-y-6">
              <a href="mailto:kumbharprashant494@gmail.com" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-muted-foreground">Email</span>
                  <span className="font-medium">kumbharprashant494@gmail.com</span>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/prashant-kumbhar-784920356/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-muted-foreground">LinkedIn</span>
                  <span className="font-medium">linkedin.com/in/prashant-kumbhar-784920356/</span>
                </div>
              </a>

              <a href="https://github.com/PrashantKumbhar1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-muted-foreground">GitHub</span>
                  <span className="font-medium">github.com/PrashantKumbhar1</span>
                </div>
              </a>

              <div className="flex items-center gap-4 text-foreground">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-muted-foreground">Location</span>
                  <span className="font-medium">Thane, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-secondary/30 border-white/5">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} className="bg-background/50 border-white/10" />
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
                            <Input placeholder="your@email.com" {...field} className="bg-background/50 border-white/10" />
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
                            <Textarea placeholder="How can I help you?" className="min-h-[120px] bg-background/50 border-white/10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-primary text-background hover:bg-primary/90 font-semibold">
                      Send Message <Send className="w-4 h-4 ml-2" />
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
