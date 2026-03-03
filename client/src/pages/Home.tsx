import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import ContactForm from "@/components/ContactForm";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FAQSection from "@/components/FAQSection";
import { useAnalytics } from "@/hooks/useAnalytics";
import { FadeInUp, SlideInLeft, ScaleIn, StaggerContainer } from "@/components/animations";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Home() {
  const { trackServiceCardClick, trackCTAClick, trackPageView } = useAnalytics();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 160, damping: 22, mass: 0.45 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 160, damping: 22, mass: 0.45 });
  const glowX = useTransform(smoothTiltY, [-10, 10], [35, 65]);
  const glowY = useTransform(smoothTiltX, [-10, 10], [58, 42]);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.42), rgba(255,255,255,0) 46%)`;

  useEffect(() => {
    trackPageView("home");
  }, []);


  return (
    <div className="min-h-screen bg-white text-foreground overflow-hidden">
      {/* Hero + Navigation */}
      <section className="relative overflow-hidden bg-[#2722f8]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#4f4bff]/60 blur-3xl" />
        </div>

        <div className="container relative z-10 pt-7 pb-12 md:pt-8 md:pb-20">
          <nav className="mb-10 flex items-center justify-between md:mb-14">
            <a href="/" className="text-3xl font-semibold tracking-tight text-white">
              iSprint
            </a>
            <div className="hidden items-center gap-8 md:flex">
              <a href="#servicos" className="text-lg font-medium text-white/85 transition hover:text-white">
                Servicos
              </a>
              <a href="#sobre" className="text-lg font-medium text-white/85 transition hover:text-white">
                Quem somos
              </a>
              <a href="#contato" className="text-lg font-medium text-white/85 transition hover:text-white">
                Contato
              </a>
              <a href="#portfolio" className="text-lg font-medium text-white/85 transition hover:text-white">
                Portfolio
              </a>
            </div>
            <Button
              className="border border-white/45 bg-white/15 text-white hover:bg-white/25 md:hidden"
              onClick={() => trackCTAClick("contato", "hero_nav_mobile")}
            >
              Contato
            </Button>
          </nav>

          <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.08fr]">
            <FadeInUp delay={0.15}>
              <div className="max-w-xl pb-4">
                <h1 className="mb-7 text-[3rem] font-semibold leading-[0.94] tracking-tight text-white sm:text-[4rem] lg:text-[5.2rem]">
                  Produtos 3D, para negócios e indústrias.
                </h1>
                <p className="mb-8 max-w-lg text-xl leading-relaxed text-white/90">
                  Desenvolvemos solucoes 3D para negocios e industrias, combinando engenharia,
                  modelagem e prototipagem para validar projetos com mais rapidez e seguranca.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-black text-white hover:bg-black/85"
                  >
                    <a
                      href="#contato"
                      onClick={() => trackCTAClick("comecar_projeto", "hero_to_orcamento")}
                    >
                      Comecar projeto <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-black/25 bg-white/50 text-black hover:bg-white/80"
                  >
                    <a
                      href="#servicos"
                      onClick={() => trackCTAClick("explorar_servicos", "hero_to_servicos")}
                    >
                      Explorar servicos
                    </a>
                  </Button>
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.25}>
              <motion.div
                className="relative h-[380px] overflow-hidden rounded-sm border border-black/10 bg-[#ebebeb] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] sm:h-[500px] lg:h-[650px]"
                style={{ perspective: 1200, rotateX: smoothTiltX, rotateY: smoothTiltY }}
                onMouseMove={(event) => {
                  const bounds = event.currentTarget.getBoundingClientRect();
                  const ratioX = (event.clientX - bounds.left) / bounds.width;
                  const ratioY = (event.clientY - bounds.top) / bounds.height;
                  tiltY.set((ratioX - 0.5) * 12);
                  tiltX.set((0.5 - ratioY) * 10);
                }}
                onMouseLeave={() => {
                  tiltX.set(0);
                  tiltY.set(0);
                }}
              >
                <iframe
                  title="Modelo Exemplo em 3D"
                  src="https://my.spline.design/interactiverobotarm-KjqpJlIkinWteU8Q84LGEdX1/"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="eager"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  allowFullScreen
                />
                <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />
                <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-white/40 bg-white/75 px-3 py-2 text-xs font-medium text-black/70 backdrop-blur sm:text-sm">
                  "Modelo Exemplo em 3D"
                </div>
              </motion.div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Services Section */}
<section id="servicos" className="py-16 bg-background">
  <div className="container">
    <FadeInUp delay={0.1}>
      <div className="text-center mb-8">
        <h2 className="text-foreground mb-4">Nossos Serviços</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Soluções técnicas completas para seus projetos de design e engenharia
        </p>
      </div>
    </FadeInUp>

    {/* GRID 2x2 com Imagens de Fundo */}
    <StaggerContainer staggerDelay={0.15} delayOffset={0.2}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Scan 3D */}
      <Link href="/scan3d" onClick={() => trackServiceCardClick("Scan 3D")} className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url('https://www.einscan.com/wp-content/uploads/2025/06/einscan.com-einscan-rigil-mobile.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-8 text-white">
          <span className="text-sm font-semibold text-secondary mb-2">Digitalização Industrial</span>
          <h3 className="text-2xl font-bold mb-3">Scan 3D e Engenharia Reversa</h3>
          <div className="inline-flex items-center text-white font-semibold group-hover:gap-2 transition-all">
            Saiba mais <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </Link>

      {/* Desenvolvimento Mecânico */}
      <Link href="/engenharia" onClick={() => trackServiceCardClick("Desenvolvimento Mecânico")} className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url('https://damassets.autodesk.net/content/dam/autodesk/draftr/23906/cad-for-machine-design-landing-intro-panel-1172x660-2.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-8 text-white">
          <span className="text-sm font-semibold text-secondary mb-2">Projetos Técnicos</span>
          <h3 className="text-2xl font-bold mb-3">Desenvolvimento Mecânico e Estrutural</h3>
          <div className="inline-flex items-center text-white font-semibold group-hover:gap-2 transition-all">
            Saiba mais <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </Link>

      {/* Modelagem CAD */}
      <Link href="/parametric" onClick={() => trackServiceCardClick("Modelagem CAD")} className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url('https://plmx.com.br/wp-content/uploads/2020/06/Modelagem3D-1.jpeg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-8 text-white">
          <span className="text-sm font-semibold text-secondary mb-2">Para você imprimir</span>
          <h3 className="text-2xl font-bold mb-3">Modelagem 3D</h3>
          <div className="inline-flex items-center text-white font-semibold group-hover:gap-2 transition-all">
            Saiba mais <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </Link>

      {/* Impressão 3D */}
      <Link href="/prototyping" onClick={() => trackServiceCardClick("Impressão 3D")} className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url('https://blog.prusa3d.com/wp-content/uploads/2018/02/farm01.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-8 text-white">
          <span className="text-sm font-semibold text-secondary mb-2">Nós fabricamos para você</span>
          <h3 className="text-2xl font-bold mb-3">Materialização e Impressão 3D</h3>
          <div className="inline-flex items-center text-white font-semibold group-hover:gap-2 transition-all">
            Saiba mais <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </Link>

    </div>
    </StaggerContainer>
  </div>
</section>

          

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="container">
          <FadeInUp delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-foreground mb-4">Projetos em Destaque</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Exemplos de trabalhos realizados com precisão técnica e criatividade
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer staggerDelay={0.15} delayOffset={0.2}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663312667618/HLPz4AQ2jqaUDP7GsJvDWw/scan-3d-showcase-VBUAtiVyeVnagmeyZFLjJY.webp')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="relative h-80 flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Scan 3D Industrial</h3>
                <p className="text-white/80">Digitalização de componentes mecânicos complexos</p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663312667618/HLPz4AQ2jqaUDP7GsJvDWw/parametric-modeling-m4Xf6moeKPmBRrmyfyA8dP.webp')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="relative h-80 flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Modelagem Paramétrica</h3>
                <p className="text-white/80">Sistema de design adaptativo e modular</p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663312667618/HLPz4AQ2jqaUDP7GsJvDWw/prototyping-lab-VioNudS7Eajax9RG3KTAZp.webp')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="relative h-80 flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Prototipagem Lab</h3>
                <p className="text-white/80">Desenvolvimento de protótipos funcionais</p>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663312667618/HLPz4AQ2jqaUDP7GsJvDWw/tech-pattern-abstract-kJGUjKGQxtaXLNSzDducNA.webp')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="relative h-80 flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Visualização Técnica</h3>
                <p className="text-white/80">Renderização e apresentação de projetos</p>
              </div>
            </div>
          </div>
          </StaggerContainer>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-gradient-to-r from-accent/5 via-secondary/5 to-accent/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SlideInLeft delay={0.2}>
              <div>
                <h2 className="text-foreground mb-6">Sobre o Studio</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
               Somos um estúdio especializado em criação técnica digital, com sede em João Pessoa – PB. 
               Unimos precisão de engenharia à criatividade visual para transformar ideias em modelos digitais funcionais, 
               prontos para validação, prototipagem e produção.
               Atuamos com escaneamento 3D, modelagem paramétrica e desenvolvimento de peças técnicas, 
               atendendo desde profissionais autônomos até empresas que precisam de soluções confiáveis e bem executadas.
               Contamos com uma equipe preparada para lidar com diferentes níveis de complexidade em projetos 3D, sempre focando em qualidade dimensional, 
               eficiência e aplicabilidade real.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Com experiência em scan 3D, modelagem paramétrica e prototipagem, ajudamos
                empresas e profissionais a visualizar, validar e comunicar seus projetos de
                forma inovadora.
              </p>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Agendar Consulta
              </Button>
              </div>
            </SlideInLeft>
            <ScaleIn delay={0.3}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white rounded-2xl p-8 border border-border">
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">100+</div>
                    <p className="text-muted-foreground">Projetos Realizados</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">100+</div>
                    <p className="text-muted-foreground">Clientes Satisfeitos</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground mb-2">5+</div>
                    <p className="text-muted-foreground">Anos de Experiência</p>
                  </div>
                </div>
              </div>
            </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel Section */}
      <TestimonialCarousel />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent via-secondary/20 to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663312667618/HLPz4AQ2jqaUDP7GsJvDWw/tech-pattern-abstract-kJGUjKGQxtaXLNSzDducNA.webp')`,
              backgroundSize: "cover",
            }}
          />
        </div>
        <div className="container relative z-10 text-center">
          <h2 className="text-white mb-6">Pronto para começar?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e vamos transformar sua ideia em um modelo digital de precisão
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Iniciar Projeto <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Form Section */}
      <section id="contato" className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">Solicitar Orçamento</h2>
              <p className="text-lg text-muted-foreground">
                Preencha o formulário abaixo e nossa equipe entrará em contato com uma proposta personalizada
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent/5 via-secondary/5 to-accent/5 rounded-2xl p-8 border border-border">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/assets/logo-icon.png" alt="iSprint" className="w-10 h-10" />
              </div>
              <p className="text-white/60 text-sm">Criação Técnica Digital</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition">Scan 3D</a></li>
                <li><a href="#" className="hover:text-white transition">Modelagem Paramétrica</a></li>
                <li><a href="#" className="hover:text-white transition">Prototipagem</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition">Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="mailto:contato@studioct.com" className="hover:text-white transition">isprintstudio@gmail.com</a></li>
                <li><a href="tel:+5511999999999" className="hover:text-white transition">+55 (83) 99185-4711</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2026 Studio de Criação Técnica. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
