
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Settings, Users, ExternalLink } from 'lucide-react';
import SquadManagement from '@/components/Squad/SquadManagement';
import SquadNotifications from '@/components/Squad/SquadNotifications';
import HonorLog from '@/components/Squad/HonorLog';
import PotLink from '@/components/Squad/PotLink';
import StreamDaVergonha from '@/components/Squad/StreamDaVergonha';
import StickerSystem from '@/components/Squad/StickerSystem';
import Desafio72h from '@/components/Squad/Desafio72h';
import QRRoletaDor from '@/components/Squad/QRRoletaDor';
import ApadrinhaMeuDesafio from '@/components/Squad/ApadrinhaMeuDesafio';
import DiscordMuroLamentacao from '@/components/Squad/DiscordMuroLamentacao';
import { Squad } from '@/types/squad';

interface AdvancedFeaturesAccordionProps {
  userSquad: Squad | null;
}

const AdvancedFeaturesAccordion = ({ userSquad }: AdvancedFeaturesAccordionProps) => {
  return (
    <Card className="card-base">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-100">
          <Settings size={24} className="text-cyber-cyan" />
          <span>FEATURES AVANÇADAS</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="squad" className="border-military-border">
            <AccordionTrigger className="text-gray-100 hover:text-cyber-cyan">
              <div className="flex items-center space-x-2">
                <Users size={20} />
                <span>GERENCIAMENTO DE SQUAD</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <SquadManagement />
                {userSquad && <SquadNotifications />}
              </div>
              
              {userSquad && (
                <div className="grid md:grid-cols-2 gap-4">
                  <HonorLog />
                  <PotLink />
                </div>
              )}
              
              {!userSquad && <PotLink />}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="social" className="border-military-border">
            <AccordionTrigger className="text-gray-100 hover:text-cyber-cyan">
              <div className="flex items-center space-x-2">
                <ExternalLink size={20} />
                <span>FEATURES SOCIAIS</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <StreamDaVergonha />
                <StickerSystem />
              </div>
              
              <Desafio72h />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="integrations" className="border-military-border">
            <AccordionTrigger className="text-gray-100 hover:text-cyber-cyan">
              <div className="flex items-center space-x-2">
                <ExternalLink size={20} />
                <span>INTEGRAÇÕES EXTERNAS</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <QRRoletaDor />
                <ApadrinhaMeuDesafio />
              </div>
              
              <DiscordMuroLamentacao />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AdvancedFeaturesAccordion;
