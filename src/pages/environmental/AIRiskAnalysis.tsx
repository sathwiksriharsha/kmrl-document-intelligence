import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Shield,
  Target,
  BarChart3,
  Calendar,
  Zap,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

interface RiskFactor {
  id: string;
  name: string;
  category: 'operational' | 'compliance' | 'environmental' | 'financial' | 'safety';
  currentLevel: number;
  previousLevel: number;
  threshold: number;
  impact: 'critical' | 'high' | 'medium' | 'low';
  likelihood: 'very-high' | 'high' | 'medium' | 'low' | 'very-low';
  trend: 'increasing' | 'decreasing' | 'stable';
  lastAssessment: string;
  nextAssessment: string;
  mitigationActions: string[];
  description: string;
}

interface Prediction {
  id: string;
  type: 'risk-escalation' | 'compliance-violation' | 'incident-probability' | 'cost-impact';
  title: string;
  description: string;
  probability: number;
  timeframe: string;
  potentialImpact: string;
  recommendedActions: string[];
  confidence: number;
  category: 'operational' | 'compliance' | 'environmental' | 'financial' | 'safety';
}

const AIRiskAnalysis: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [riskCategory, setRiskCategory] = useState('all');

  const riskFactors: RiskFactor[] = [
    {
      id: '1',
      name: 'Air Quality Compliance Risk',
      category: 'compliance',
      currentLevel: 85,
      previousLevel: 70,
      threshold: 80,
      impact: 'high',
      likelihood: 'high',
      trend: 'increasing',
      lastAssessment: '2024-01-15',
      nextAssessment: '2024-02-15',
      mitigationActions: ['Increase monitoring frequency', 'Review emission controls', 'Staff training'],
      description: 'Risk of exceeding air quality emission limits based on current trends and monitoring data'
    },
    {
      id: '2',
      name: 'Water Discharge Violation Risk',
      category: 'environmental',
      currentLevel: 45,
      previousLevel: 55,
      threshold: 70,
      impact: 'medium',
      likelihood: 'medium',
      trend: 'decreasing',
      lastAssessment: '2024-01-12',
      nextAssessment: '2024-02-12',
      mitigationActions: ['Upgrade filtration system', 'Regular maintenance checks'],
      description: 'Probability of water discharge parameters exceeding permitted levels'
    },
    {
      id: '3',
      name: 'Chemical Storage Safety Risk',
      category: 'safety',
      currentLevel: 75,
      previousLevel: 73,
      threshold: 60,
      impact: 'critical',
      likelihood: 'medium',
      trend: 'increasing',
      lastAssessment: '2024-01-10',
      nextAssessment: '2024-02-10',
      mitigationActions: ['Improve storage protocols', 'Enhanced safety training', 'Regular inspections'],
      description: 'Risk assessment for chemical storage facility safety protocols and containment systems'
    },
    {
      id: '4',
      name: 'Regulatory Compliance Gap Risk',
      category: 'compliance',
      currentLevel: 30,
      previousLevel: 40,
      threshold: 50,
      impact: 'high',
      likelihood: 'low',
      trend: 'decreasing',
      lastAssessment: '2024-01-08',
      nextAssessment: '2024-02-08',
      mitigationActions: ['Policy updates', 'Compliance training', 'Regular audits'],
      description: 'Risk of non-compliance with evolving environmental regulations'
    },
    {
      id: '5',
      name: 'Operational Efficiency Risk',
      category: 'operational',
      currentLevel: 60,
      previousLevel: 58,
      threshold: 65,
      impact: 'medium',
      likelihood: 'medium',
      trend: 'stable',
      lastAssessment: '2024-01-14',
      nextAssessment: '2024-02-14',
      mitigationActions: ['Process optimization', 'Equipment upgrades', 'Performance monitoring'],
      description: 'Risk to operational efficiency due to aging equipment and processes'
    }
  ];

  const predictions: Prediction[] = [
    {
      id: '1',
      type: 'compliance-violation',
      title: 'Air Quality Limit Exceedance',
      description: 'High probability of exceeding air quality emission limits within the next 30 days based on current trends',
      probability: 78,
      timeframe: '15-30 days',
      potentialImpact: 'Regulatory fines: $50,000-$200,000, Operational shutdown risk',
      recommendedActions: [
        'Implement immediate emission reduction measures',
        'Increase monitoring frequency to daily',
        'Review and optimize combustion processes',
        'Prepare contingency response plan'
      ],
      confidence: 85,
      category: 'compliance'
    },
    {
      id: '2',
      type: 'incident-probability',
      title: 'Chemical Storage Incident Risk',
      description: 'Elevated risk of chemical storage incident due to increasing safety risk factors',
      probability: 65,
      timeframe: '45-60 days',
      potentialImpact: 'Safety incident, Environmental contamination, Regulatory investigation',
      recommendedActions: [
        'Conduct comprehensive safety audit',
        'Update storage protocols immediately',
        'Increase safety training frequency',
        'Install additional monitoring systems'
      ],
      confidence: 72,
      category: 'safety'
    },
    {
      id: '3',
      type: 'cost-impact',
      title: 'Regulatory Compliance Costs',
      description: 'Projected increase in compliance costs due to new regulations and aging infrastructure',
      probability: 90,
      timeframe: '6-12 months',
      potentialImpact: 'Additional costs: $300,000-$500,000 annually',
      recommendedActions: [
        'Budget planning for compliance upgrades',
        'Evaluate cost-effective solutions',
        'Negotiate with regulatory authorities',
        'Implement phased upgrade plan'
      ],
      confidence: 88,
      category: 'financial'
    },
    {
      id: '4',
      type: 'risk-escalation',
      title: 'Water Quality Degradation',
      description: 'Potential escalation of water quality issues if current mitigation efforts are insufficient',
      probability: 40,
      timeframe: '3-6 months',
      potentialImpact: 'Permit suspension, Environmental damage, Community relations impact',
      recommendedActions: [
        'Accelerate filtration system upgrade',
        'Implement additional water treatment measures',
        'Increase monitoring and reporting',
        'Engage with community stakeholders'
      ],
      confidence: 68,
      category: 'environmental'
    }
  ];

  const getRiskLevelColor = (level: number, threshold: number) => {
    if (level >= threshold + 20) return 'text-red-600 bg-red-100';
    if (level >= threshold) return 'text-orange-600 bg-orange-100';
    if (level >= threshold - 20) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-600" />;
      case 'stable': return <Activity className="h-4 w-4 text-blue-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliance': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'environmental': return <Target className="h-4 w-4 text-green-600" />;
      case 'safety': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'operational': return <BarChart3 className="h-4 w-4 text-purple-600" />;
      case 'financial': return <TrendingUp className="h-4 w-4 text-orange-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredRiskFactors = riskCategory === 'all' 
    ? riskFactors 
    : riskFactors.filter(factor => factor.category === riskCategory);

  const highRiskCount = riskFactors.filter(factor => factor.currentLevel >= factor.threshold).length;
  const criticalRiskCount = riskFactors.filter(factor => factor.impact === 'critical' && factor.currentLevel >= factor.threshold).length;
  const increasingTrendsCount = riskFactors.filter(factor => factor.trend === 'increasing').length;

  return (
    <DashboardLayout>
      <div className="space-y-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Risk Analysis</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">AI-powered environmental risk assessment and predictive analytics</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
              <SelectItem value="1y">1 year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Analysis
          </Button>
        </div>
      </div>

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk Factors</p>
                <p className="text-2xl font-bold text-red-600">{highRiskCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Risks</p>
                <p className="text-2xl font-bold text-red-600">{criticalRiskCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Increasing Trends</p>
                <p className="text-2xl font-bold text-orange-600">{increasingTrendsCount}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Confidence</p>
                <p className="text-2xl font-bold text-green-600">84%</p>
              </div>
              <Brain className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Factors */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Risk Factors
              </CardTitle>
              <Select value={riskCategory} onValueChange={setRiskCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRiskFactors.map((factor) => (
                <div key={factor.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getImpactColor(factor.impact)}`} />
                        <h4 className="font-semibold text-gray-900">{factor.name}</h4>
                        {getTrendIcon(factor.trend)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(factor.category)}
                        <span className="text-sm text-gray-500 capitalize">{factor.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Next: {new Date(factor.nextAssessment).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-sm font-medium ${getRiskLevelColor(factor.currentLevel, factor.threshold)}`}>
                      {factor.currentLevel}% Risk Level
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Risk Level</span>
                      <span>{factor.currentLevel}% (Threshold: {factor.threshold}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          factor.currentLevel >= factor.threshold ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${factor.currentLevel}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Mitigation Actions:</span>
                    <ul className="list-disc list-inside mt-1 ml-2">
                      {factor.mitigationActions.map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Predictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getCategoryIcon(prediction.category)}
                        <h4 className="font-semibold text-gray-900">{prediction.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{prediction.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Probability:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-orange-500"
                            style={{ width: `${prediction.probability}%` }}
                          />
                        </div>
                        <span className="text-orange-600 font-medium">{prediction.probability}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">AI Confidence:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${prediction.confidence}%` }}
                          />
                        </div>
                        <span className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 text-sm">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">Timeframe:</span>
                      <span className="text-gray-600">{prediction.timeframe}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">Potential Impact:</span>
                      <p className="text-gray-600 mt-1">{prediction.potentialImpact}</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Recommended Actions:</span>
                    <ul className="list-disc list-inside mt-1 ml-2 text-gray-600">
                      {prediction.recommendedActions.map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default AIRiskAnalysis;